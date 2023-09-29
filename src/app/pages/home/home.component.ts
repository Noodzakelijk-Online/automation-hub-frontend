import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { Router } from '@angular/router'
import { AUTOMATIONS_SERVICE_TOKEN } from '../../services/automations/automations.service.token'
import { IAutomationsService } from '../../services/automations.service.interface'
import { IAutomationModel } from '../../models/automation.model.interface'
import { AUTH_SERVICE_TOKEN } from '../../services/auth/auth.service.token'
import { IAuthService } from '../../services/auth.service.interface'
import { AutomationsFormComponent } from './modals/automations-form/automations-form.component'
import { NzModalService } from 'ng-zorro-antd/modal'
import { Subscription } from 'rxjs'
import { UserService } from '../../services/user/user.service'
import { USER_SERVICE_TOKEN } from '../../services/user/user.service.token'
import { IUserModel } from '../../models/user.model.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private userSubscription?: Subscription
  isProfileVisible = false
  profileForm: FormGroup = this.fb.group({})
  hidePassword: boolean = true
  hidePasswordConfirm: boolean = true
  automations: IAutomationModel[] = []
  @ViewChild('automationModal', { static: false })
  automationModal!: AutomationsFormComponent

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    @Inject(AUTOMATIONS_SERVICE_TOKEN)
    private automationsService: IAutomationsService,
    @Inject(AUTH_SERVICE_TOKEN) private authService: IAuthService,
    @Inject(USER_SERVICE_TOKEN) private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onInitForm()
  }

  onInitForm() {
    this.profileForm = this.fb.group(
      {
        email: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        confirmPassword: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      },
      { validators: this.checkPasswords }
    )

    this.loadAutomations()
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']).then(() => {})
      },
      error: (err) => {
        this.notification.error('Error', 'There was an issue during logout.')
        console.error(err)
      },
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    const id1 = this.automations[event.previousIndex].id
    const id2 = this.automations[event.currentIndex].id
    console.log('id1', id1)
    console.log('id2', id2)
    console.log('previousIndex', event.previousIndex)
    console.log('currentIndex', event.currentIndex)

    if (!id1 || !id2 || id1 === id2) {
      return
    }
    moveItemInArray(this.automations, event.previousIndex, event.currentIndex)

    this.automationsService.swapAutomations(id1, id2).subscribe()
  }

  handleFormDataAutomationSubmitted(automation: IAutomationModel) {
    console.log('automation pré sending to service front: ', automation)
    console.log('imageFile: ', automation.imageFile)
    if (this.automationModal.isUpdate) {
      this.automationsService.updateAutomation(automation).subscribe({
        next: () => {
          this.notification.success(
            'Success',
            'Automation updated successfully'
          )
          this.loadAutomations()
        },
        error: () => {
          this.notification.error('Error', 'Error updating automation')
        },
      })
    } else {
      this.automationsService.addAutomation(automation).subscribe({
        next: () => {
          this.notification.success('Success', 'Automation added successfully')
          this.loadAutomations()
        },
        error: () => {
          this.notification.error('Error', 'Error adding automation')
        },
      })
    }
  }

  showProfileModal(): void {
    this.userSubscription = this.userService.getUser().subscribe((user) => {
      this.profileForm.get('email')?.setValue(user.email)
      this.isProfileVisible = true
    })
  }

  onProfileSubmit(): void {
    if (!this.profileForm.valid) {
      for (const i in this.profileForm.controls) {
        this.profileForm.controls[i].markAsDirty()
        this.profileForm.controls[i].updateValueAndValidity()
      }
      return
    }

    const user: IUserModel = {
      email: this.profileForm.get('email')?.value,
      password: this.profileForm.get('password')?.value,
    }

    this.userSubscription = this.userService.updateUser(user).subscribe({
      next: () => {
        this.notification.success('Success', 'Profile updated successfully')
        this.loadAutomations()
        this.isProfileVisible = false
        this.profileForm.reset()
      },
      error: (err) => {
        this.notification.error(
          'Error',
          'There was an issue updating your profile.'
        )
        console.error(err)
      },
    })
  }

  handleProfileCancel(): void {
    console.log('Profile form cancel')
    this.isProfileVisible = false
    this.profileForm.reset()
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
      this.userSubscription = undefined
    }
  }

  checkPasswords(group: FormGroup) {
    // @ts-ignore
    let pass = group.get('password').value
    // @ts-ignore
    let confirmPass = group.get('confirmPassword').value

    return pass === confirmPass ? null : { notSame: true }
  }

  loadAutomations() {
    this.automationsService.getAutomations().subscribe({
      next: (automations: IAutomationModel[]) => {
        this.automations = automations.sort((a, b) => a.position - b.position)
      },
      error: (error) => {
        // registry a log
        console.error('Error fetching automations', error)
        this.notification.create(
          'error',
          'Error',
          'There was an error fetching the automations.'
        )
      },
    })
  }

  openAutomationModal(
    automation?: IAutomationModel,
    isUpdate: boolean = false
  ) {
    this.automationModal.openModal(automation, isUpdate)
  }

  deleteAutomation(automationId: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this automation?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.automationsService.deleteAutomation(automationId).subscribe(() => {
          this.loadAutomations()
          this.notification.create(
            'success',
            'Automation deleted',
            'Automation deleted successfully.'
          )
        })
      },
      nzCancelText: 'No',
      nzOnCancel: () => {},
    })
  }
}
