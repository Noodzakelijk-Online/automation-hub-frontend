import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload'
import { IAutomationModel } from '../../../../models/automation.model.interface'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'app-automations-form-modal',
  templateUrl: './automations-form.component.html',
  styleUrls: ['./automations-form.component.scss'],
})
export class AutomationsFormComponent implements OnInit {
  modalTitle: string = ''
  removeImage: boolean = false
  selectedImage: File | undefined
  @Input() isUpdate: boolean = false
  @Input() isVisible: boolean = false
  @Input() uploadUrl: string = ''
  @Output() modalClosed = new EventEmitter<void>()
  @Output() formDataSubmitted = new EventEmitter<IAutomationModel>()
  automationForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.onInitForm()
  }

  onInitForm() {
    this.automationForm = this.fb.group({
      id: [null],
      name: [
        '',
        { validators: [Validators.required, Validators.maxLength(50)] },
      ],
      host: [
        '',
        { validators: [Validators.required, Validators.maxLength(50)] },
      ],
      port: [
        '',
        {
          validators: [
            Validators.required,
            Validators.min(1),
            Validators.max(65535),
          ],
        },
      ],
    })
  }

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    this.selectedImage = file as unknown as File
    console.log('file in beforeUpload: ', this.selectedImage)
    return false // Impede o envio automático
  }

  handleImageUpload({ file, fileList }: NzUploadChangeParam): void {
    this.selectedImage = file.originFileObj // Armazene o objeto de arquivo original
    console.log('status: ', file.status)
    console.log('file: ', file)
    console.log('file - selectedImage: ', this.selectedImage)
    const status = file.status
    if (status !== 'uploading') {
      console.log(file, fileList)
    }
    if (status === 'done') {
      this.notification.create(
        'success',
        'Upload Successful',
        `${file.name} image uploaded successfully.`
      )
      console.log('status done : ', file)
      //this.automationForm.get('image')?.setValue(file.response.imagePath);
    } else if (status === 'error') {
      this.notification.create(
        'error',
        'Upload Failed',
        `${file.name} image upload failed.`
      )
    }
  }

  onSubmit(): void {
    console.log('imageFile in onSubmit: ', this.selectedImage)
    if (!this.automationForm.valid) {
      for (const i in this.automationForm.controls) {
        this.automationForm.controls[i].markAsDirty()
        this.automationForm.controls[i].updateValueAndValidity()
      }
      return
    }

    const automation: IAutomationModel = {
      ...this.automationForm.value,
      position: 0,
      imageFile: this.selectedImage,
      removeImage: this.removeImage,
    }

    if (!automation.id) {
      delete automation.id
    }

    this.formDataSubmitted.emit(automation)
    this.closeModal()
  }

  openModal(automation?: IAutomationModel, isUpdate: boolean = false) {
    this.isVisible = true
    this.isUpdate = isUpdate
    if (automation) {
      this.automationForm.patchValue({
        id: automation.id,
        name: automation.name,
        host: automation.host,
        port: automation.port,
      })
      this.automationForm.get('image')?.setValue(automation.image)
    }
    if ((!this.modalTitle || this.modalTitle === '') && !this.isUpdate) {
      this.modalTitle = 'Add Automation'
    } else if ((!this.modalTitle || this.modalTitle === '') && this.isUpdate) {
      this.modalTitle = 'Update Automation'
    }
  }

  closeModal() {
    this.isVisible = false
    this.modalClosed.emit()
    this.automationForm.reset()
    this.modalTitle = ''
  }

  deleteImage() {
    if (this.removeImage) {
      this.removeImage = false
    } else {
      this.removeImage = true
    }
  }
}
