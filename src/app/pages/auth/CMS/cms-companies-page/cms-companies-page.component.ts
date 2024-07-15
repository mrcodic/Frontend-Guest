import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ID } from '../../../../shared/ServicesBase';
import { CMSCompanies, Companies } from '../../../../data-model/cms.model';
import { CrudService } from '../../../../service/crud.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DataService } from '../../../../service/data.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableColumns, DataTableRowType } from '../../../../data-model/data-table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms-companies-page',
  templateUrl: './cms-companies-page.component.html',
  styleUrl: './cms-companies-page.component.scss',
})
export class CmsCompaniesPageComponent implements OnInit {
  added: boolean = false;



  pageTitle: string = 'Companies';
  header!: any;
  AlKhaldiLogistics!: any;
  FuelWay!: any;
  AlkhaldiRealState!: any;
  AlKhaldiBuilding!: any;
  AutoGulf!: any;
  SaudiDrill!: any;
  SaudiaFalcon!: any;
  companiesForm!: FormGroup;
  AlKhaldiLogisticsForm!:FormGroup;
  FuelWayForm!:FormGroup;
  AlkhaldiRealStateForm!:FormGroup;
  AlKhaldiBuildingForm!:FormGroup;
  AutoGulfForm!:FormGroup;
  SaudiDrillForm!:FormGroup;
  SaudiaFalconForm!:FormGroup;
  SaudiaFalconBioData: any;

  // company
  companyForm!: FormGroup;
  companies!: any;
  company!: any;
  isAdded:boolean = false;

  // new add company
  NewCompany!: any;
  newCompanyForm!: FormGroup;

  newCompanyAdded: any;
  newCompany_id: ID = '';
  newCompanyName: any;
  newCompanies: {_id: string, name: string}[] = [];
  newCompanyData: any;

  cols: DataTableColumns[] = [];
  action: string = 'new';
  display: boolean = false;

  constructor(
    private dataService: DataService, 
    private messageService: MessageService,
    private fb:FormBuilder,
    private confirmationService: ConfirmationService,
    private CRUDService: CrudService,
    private router: Router
  ) {
    this.initializecompanyForm();
    // this.initializeAlKhaldiLogisticsForm();
    // this.initializeFuelWayForm();
    // this.initializeAlkhaldiRealStateForm();
    // this.initializeAlKhaldiBuildingForm();
    // this.initializeAutoGulfForm();
    // this.initializeSaudiDrillForm();
    // this.initializeSaudiaFalconForm();

    // this.initializeCompanyForm();

    this.intializeNewCompanyForm();
  }
  ngOnInit(): void {

    this.getAddedCompanies();

    // this.loadAddedCompanies();

    this.dataService.getData('companyHeader').subscribe((res: any) => {
      this.header = res.result

      if (this.header) {
        this.companiesForm.patchValue({
          label: this.header.label,
          labelAr: this.header.labelAr,
          image: this.header.image,
        })
      }
    })
    // this.dataService.getData('companyAlKhaldiLogistics').subscribe((res: any) => {
    //   this.AlKhaldiLogistics = res.result
    //   if (this.AlKhaldiLogistics) {
    //     this.AlKhaldiLogisticsForm.setControl('AlKhaldiLogisticsImageWithLabel', this.fb.array([]));
    //     const AlKhaldiLogisticsImageWithLabelArray = this.AlKhaldiLogisticsForm.get('AlKhaldiLogisticsImageWithLabel');

    //     this.AlKhaldiLogistics.imageWithLabel.forEach((imageLabel: any) => {
    //       const AlKhaldiLogisticsForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (AlKhaldiLogisticsImageWithLabelArray as any).push(AlKhaldiLogisticsForm);
    //   });

    //     this.AlKhaldiLogisticsForm.patchValue({
    //       AlKhaldiLogisticsName: this.AlKhaldiLogistics.name,
    //       AlKhaldiLogisticsNameAr: this.AlKhaldiLogistics.nameAr,
    //       AlKhaldiLogisticsBio: this.AlKhaldiLogistics.bio,
    //       AlKhaldiLogisticsBioAr: this.AlKhaldiLogistics.bioAr,
    //       AlKhaldiLogisticsLogo: this.AlKhaldiLogistics.logo,
    //       AlKhaldiLogisticsImage: this.AlKhaldiLogistics.image,
    //       AlKhaldiLogisticsSupportImage: this.AlKhaldiLogistics.supportImage,
    //       AlKhaldiLogisticsPdf: this.AlKhaldiLogistics.detailsPdf,
    //       AlKhaldiLogisticsBrochures: this.AlKhaldiLogistics.brochuresPdf,
    //       AlKhaldiLogisticsWebsite: this.AlKhaldiLogistics.website,
    //     })
    //   }
    // })
    // this.dataService.getData('companyFuelWay').subscribe((res: any) => {
    //   this.FuelWay = res.result
    //   if (this.FuelWay) {
    //     this.FuelWayForm.setControl('FuelWayImageWithLabel', this.fb.array([]));
    //     const FuelWayImageWithLabelArray = this.FuelWayForm.get('FuelWayImageWithLabel');

    //     this.FuelWay.imageWithLabel.forEach((imageLabel: any) => {
    //       const FuelWayForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (FuelWayImageWithLabelArray as any).push(FuelWayForm);
    //     })
    //     this.FuelWayForm.patchValue({
    //       FuelWayName: this.FuelWay.name,
    //       FuelWayNameAr: this.FuelWay.nameAr,
    //       FuelWayBio: this.FuelWay.bio,
    //       FuelWayBioAr: this.FuelWay.bioAr,
    //       FuelWayLogo: this.FuelWay.logo,
    //       FuelWayImage: this.FuelWay.image,
    //       FuelWaySupportImage: this.FuelWay.supportImage,
    //       FuelWayPdf: this.FuelWay.detailsPdf,
    //       FuelWayBrochures: this.FuelWay.brochuresPdf,
    //       FuelWayWebsite: this.FuelWay.website,
    //     })
    //   }
    // })
    // this.dataService.getData('companyAlkhaldiRealState').subscribe((res: any) => {
    //   this.AlkhaldiRealState = res.result
    //   if (this.AlkhaldiRealState) {
    //     this.AlkhaldiRealStateForm.setControl('AlkhaldiRealStateImageWithLabel', this.fb.array([]));
    //     const AlkhaldiRealStateImageWithLabelArray = this.AlkhaldiRealStateForm.get('AlkhaldiRealStateImageWithLabel');

    //     this.AlkhaldiRealState.imageWithLabel.forEach((imageLabel: any) => {
    //       const AlkhaldiRealStateForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (AlkhaldiRealStateImageWithLabelArray as any).push(AlkhaldiRealStateForm);
    //     })
    //     this.AlkhaldiRealStateForm.patchValue({
    //       AlkhaldiRealStateName: this.AlkhaldiRealState.name,
    //       AlkhaldiRealStateNameAr: this.AlkhaldiRealState.nameAr,
    //       AlkhaldiRealStateBio: this.AlkhaldiRealState.bio,
    //       AlkhaldiRealStateBioAr: this.AlkhaldiRealState.bioAr,
    //       AlkhaldiRealStateLogo: this.AlkhaldiRealState.logo,
    //       AlkhaldiRealStateImage: this.AlkhaldiRealState.image,
    //       AlkhaldiRealStateSupportImage: this.AlkhaldiRealState.supportImage,
    //       AlkhaldiRealStatePdf: this.AlkhaldiRealState.detailsPdf,
    //       AlkhaldiRealStateBrochures: this.AlkhaldiRealState.brochuresPdf,
    //       AlkhaldiRealStateWebsite: this.AlkhaldiRealState.website,
    //     })
    //   }
    // })
    // this.dataService.getData('companyAlKhaldiBuilding').subscribe((res: any) => {
    //   this.AlKhaldiBuilding = res.result
    //   if (this.AlKhaldiBuilding) {
    //     this.AlKhaldiBuildingForm.setControl('AlKhaldiBuildingImageWithLabel', this.fb.array([]));
    //     const AlKhaldiBuildingImageWithLabelArray = this.AlKhaldiBuildingForm.get('AlKhaldiBuildingImageWithLabel');

    //     this.AlKhaldiBuilding.imageWithLabel.forEach((imageLabel: any) => {
    //       const AlKhaldiBuildingForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (AlKhaldiBuildingImageWithLabelArray as any).push(AlKhaldiBuildingForm);
    //     })
    //     this.AlKhaldiBuildingForm.patchValue({
    //       AlKhaldiBuildingName: this.AlKhaldiBuilding.name,
    //       AlKhaldiBuildingNameAr: this.AlKhaldiBuilding.nameAr,
    //       AlKhaldiBuildingBio: this.AlKhaldiBuilding.bio,
    //       AlKhaldiBuildingBioAr: this.AlKhaldiBuilding.bioAr,
    //       AlKhaldiBuildingLogo: this.AlKhaldiBuilding.logo,
    //       AlKhaldiBuildingImage: this.AlKhaldiBuilding.image,
    //       AlKhaldiBuildingSupportImage: this.AlKhaldiBuilding.supportImage,
    //       AlKhaldiBuildingPdf: this.AlKhaldiBuilding.detailsPdf,
    //       AlKhaldiBuildingBrochures: this.AlKhaldiBuilding.brochuresPdf,
    //       AlKhaldiBuildingWebsite: this.AlKhaldiBuilding.website,
    //     })
    //   }
    // })
    // this.dataService.getData('companyAutoGulf').subscribe((res: any) => {
    //   this.AutoGulf = res.result
    //   if (this.AutoGulf) {
    //     this.AutoGulfForm.setControl('AutoGulfImageWithLabel', this.fb.array([]));
    //     const AutoGulfImageWithLabelArray = this.AutoGulfForm.get('AutoGulfImageWithLabel');

    //     this.AutoGulf.imageWithLabel.forEach((imageLabel: any) => {
    //       const AutoGulfForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (AutoGulfImageWithLabelArray as any).push(AutoGulfForm);
    //     })
    //     this.AutoGulfForm.patchValue({
    //       AutoGulfName: this.AutoGulf.name,
    //       AutoGulfNameAr: this.AutoGulf.nameAr,
    //       AutoGulfBio: this.AutoGulf.bio,
    //       AutoGulfBioAr: this.AutoGulf.bioAr,
    //       AutoGulfLogo: this.AutoGulf.logo,
    //       AutoGulfImage: this.AutoGulf.image,
    //       AutoGulfSupportImage: this.AutoGulf.supportImage,
    //       AutoGulfPdf: this.AutoGulf.detailsPdf,
    //       AutoGulfBrochures: this.AutoGulf.brochuresPdf,
    //       AutoGulfWebsite: this.AutoGulf.website,
    //     })
    //   }
    // })
    // this.dataService.getData('companySaudiDrill').subscribe((res: any) => {
    //   this.SaudiDrill = res.result
    //   if (this.SaudiDrill) {
    //     this.SaudiDrillForm.setControl('SaudiDrillImageWithLabel', this.fb.array([]));
    //     const SaudiDrillImageWithLabelArray = this.SaudiDrillForm.get('SaudiDrillImageWithLabel');

    //     this.SaudiDrill.imageWithLabel.forEach((imageLabel: any) => {
    //       const SaudiDrillForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (SaudiDrillImageWithLabelArray as any).push(SaudiDrillForm);
    //     })
    //     this.SaudiDrillForm.patchValue({
    //       SaudiDrillName: this.SaudiDrill.name,
    //       SaudiDrillNameAr: this.SaudiDrill.nameAr,
    //       SaudiDrillBio: this.SaudiDrill.bio,
    //       SaudiDrillBioAr: this.SaudiDrill.bioAr,
    //       SaudiDrillLogo: this.SaudiDrill.logo,
    //       SaudiDrillImage: this.SaudiDrill.image,
    //       SaudiDrillSupportImage: this.SaudiDrill.supportImage,
    //       SaudiDrillPdf: this.SaudiDrill.detailsPdf,
    //       SaudiDrillBrochures: this.SaudiDrill.brochuresPdf,
    //       SaudiDrillWebsite: this.SaudiDrill.website,
    //     })
    //   }
    // })
    // this.dataService.getData('companySaudiFalcon').subscribe((res: any) => {
    //   this.SaudiaFalcon = res.result
    //   if (this.SaudiaFalcon) {
    //     this.SaudiaFalconForm.setControl('SaudiaFalconImageWithLabel', this.fb.array([]));
    //     const SaudiFalconImageWithLabelArray = this.SaudiaFalconForm.get('SaudiaFalconImageWithLabel');

    //     this.SaudiaFalcon.imageWithLabel.forEach((imageLabel: any) => {
    //       const SaudiFalconForm = this.fb.group({
    //           label: [imageLabel.label, Validators.required],
    //           labelAr: [imageLabel.labelAr, Validators.required],
    //           image: [imageLabel.image, Validators.required],
    //       });
    //       (SaudiFalconImageWithLabelArray as any).push(SaudiFalconForm);
    //     })



    //     this.SaudiaFalconForm.patchValue({
    //       SaudiaFalconName: this.SaudiaFalcon.name,
    //       SaudiaFalconNameAr: this.SaudiaFalcon.nameAr,
    //       SaudiaFalconBio: this.SaudiaFalcon.bio,
    //       SaudiaFalconBioAr: this.SaudiaFalcon.bioAr,
    //       SaudiaFalconLogo: this.SaudiaFalcon.logo,
    //       SaudiaFalconImage: this.SaudiaFalcon.image,
    //       SaudiaFalconSupportImage: this.SaudiaFalcon.supportImage,
    //       SaudiaFalconPdf: this.SaudiaFalcon.detailsPdf,
    //       SaudiaFalconBrochures: this.SaudiaFalcon.brochuresPdf,
    //       SaudiaFalconWebsite: this.SaudiaFalcon.website,
    //     })
    //   }
    // })

    // this.getCompanyData();

  }
  initializecompanyForm() {
    this.companiesForm = this.fb.group({
      label: [null, Validators.required],
      labelAr: [null, Validators.required],
      image: ['', Validators.required],
    })
  }

  initializeAlKhaldiLogisticsForm() {
    this.AlKhaldiLogisticsForm = this.fb.group({
      AlKhaldiLogisticsName: [null, Validators.required],
      AlKhaldiLogisticsNameAr: [null, Validators.required],
      AlKhaldiLogisticsBio: [null, Validators.required],
      AlKhaldiLogisticsBioAr: [null, Validators.required],
      AlKhaldiLogisticsLogo: ['', Validators.required],
      AlKhaldiLogisticsImage: ['', Validators.required],
      AlKhaldiLogisticsSupportImage: ['', Validators.required],
      AlKhaldiLogisticsPdf: ['', Validators.required],
      AlKhaldiLogisticsBrochures: ['', Validators.required],
      AlKhaldiLogisticsImageWithLabel: [this.fb.array([])],
      AlKhaldiLogisticsWebsite: ['', Validators.required],
    })
  }

  initializeFuelWayForm() {
    this.FuelWayForm = this.fb.group({
      FuelWayName: [null, Validators.required],
      FuelWayNameAr: [null, Validators.required],
      FuelWayBio: [null, Validators.required],
      FuelWayBioAr: [null, Validators.required],
      FuelWayLogo: ['', Validators.required],
      FuelWayImage: ['', Validators.required],
      FuelWaySupportImage: ['', Validators.required],
      FuelWayBrochures: ['', Validators.required],
      FuelWayPdf: ['', Validators.required],
      FuelWayImageWithLabel: [this.fb.array([]), Validators.required],
      FuelWayWebsite: ['', Validators.required],
    })
  }
  initializeAlkhaldiRealStateForm() {
    this.AlkhaldiRealStateForm = this.fb.group({
      AlkhaldiRealStateName: [null, Validators.required],
      AlkhaldiRealStateNameAr: [null, Validators.required],
      AlkhaldiRealStateBio: [null, Validators.required],
      AlkhaldiRealStateBioAr: [null, Validators.required],
      AlkhaldiRealStateLogo: ['', Validators.required],
      AlkhaldiRealStateImage: ['', Validators.required],
      AlkhaldiRealStateSupportImage: ['', Validators.required],
      AlkhaldiRealStatePdf: ['', Validators.required],
      AlkhaldiRealStateBrochures: ['', Validators.required],
      AlkhaldiRealStateImageWithLabel: [this.fb.array([]), Validators.required],
      AlkhaldiRealStateWebsite: ['', Validators.required],
    })
  }

  initializeAlKhaldiBuildingForm() {
    this.AlKhaldiBuildingForm = this.fb.group({
      AlKhaldiBuildingName: [null, Validators.required],
      AlKhaldiBuildingNameAr: [null, Validators.required],
      AlKhaldiBuildingBio: [null, Validators.required],
      AlKhaldiBuildingBioAr: [null, Validators.required],
      AlKhaldiBuildingLogo: ['', Validators.required],
      AlKhaldiBuildingImage: ['', Validators.required],
      AlKhaldiBuildingSupportImage: ['', Validators.required],
      AlKhaldiBuildingPdf: ['', Validators.required],
      AlKhaldiBuildingBrochures: ['', Validators.required],
      AlKhaldiBuildingImageWithLabel: [this.fb.array([]), Validators.required],
      AlKhaldiBuildingWebsite: ['', Validators.required],
    })
  }

  initializeAutoGulfForm() {
    this.AutoGulfForm = this.fb.group({
      AutoGulfName: [null, Validators.required],
      AutoGulfNameAr: [null, Validators.required],
      AutoGulfBio: [null, Validators.required],
      AutoGulfBioAr: [null, Validators.required],
      AutoGulfLogo: ['', Validators.required],
      AutoGulfImage: ['', Validators.required],
      AutoGulfSupportImage: ['', Validators.required],
      AutoGulfPdf: ['', Validators.required],
      AutoGulfBrochures: ['', Validators.required],
      AutoGulfImageWithLabel: [this.fb.array([]), Validators.required],
      AutoGulfWebsite: ['', Validators.required],
    })
  }

  initializeSaudiDrillForm() {
    this.SaudiDrillForm = this.fb.group({
      SaudiDrillName: [null, Validators.required],
      SaudiDrillNameAr: [null, Validators.required],
      SaudiDrillBio: [null, Validators.required],
      SaudiDrillBioAr: [null, Validators.required],
      SaudiDrillLogo: ['', Validators.required],
      SaudiDrillImage: ['', Validators.required],
      SaudiDrillSupportImage: ['', Validators.required],
      SaudiDrillPdf: ['', Validators.required],
      SaudiDrillBrochures: ['', Validators.required],
      SaudiDrillImageWithLabel: [this.fb.array([]), Validators.required],
      SaudiDrillWebsite: ['', Validators.required],
    })
  }

  initializeSaudiaFalconForm() {
    this.SaudiaFalconForm = this.fb.group({
      SaudiaFalconName: [null, Validators.required],
      SaudiaFalconNameAr: [null, Validators.required],
      SaudiaFalconBio: ['', Validators.required],
      SaudiaFalconBioAr: ['', Validators.required],
      SaudiaFalconLogo: ['', Validators.required],
      SaudiaFalconImage: ['', Validators.required],
      SaudiaFalconSupportImage: ['', Validators.required],
      SaudiaFalconPdf: ['', Validators.required],
      SaudiaFalconBrochures: ['', Validators.required],
      SaudiaFalconImageWithLabel: [this.fb.array([]), Validators.required],
      SaudiaFalconWebsite: ['', Validators.required],
    })
  }

  // new add company initialize func.
  intializeNewCompanyForm(){
    this.newCompanyForm = this.fb.group({
      name: [null, Validators.required],
      nameAr: [null, Validators.required],
      image: ['', Validators.required],
      bio: ['', Validators.required],
      bioAr: ['', Validators.required],
      website: ['', Validators.required],
      logo: ['', Validators.required],
      supportImage: ['', Validators.required],
      brochuresPdf: ['', Validators.required],
      detailsPdf: ['', Validators.required],
      imageWithLabel: [this.fb.array([]), Validators.required],
    })
  }

  getWithLabel(label: string,formName:string): FormArray | any{
    if(formName=='header'){
      const formControl = this.companiesForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if (formName == 'AlKhaldiLogistics'){
      const formControl = this.AlKhaldiLogisticsForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName=='FuelWay'){
      const formControl = this.FuelWayForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName=='AlkhaldiRealState'){
      const formControl = this.AlkhaldiRealStateForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName == 'AlKhaldiBuilding'){
      const formControl = this.AlKhaldiBuildingForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName=='AutoGulf'){
      const formControl = this.AutoGulfForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName=='SaudiDrill'){
      const formControl = this.SaudiDrillForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName=='SaudiaFalcon'){
      const formControl = this.SaudiaFalconForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }else if(formName=='NewCompany'){
      const formControl = this.newCompanyForm.get(label);
      return formControl instanceof FormArray ? formControl : null;
    }
  }


  addWithLabel(label: string,formName:string) {
    let formArray = this.getWithLabel(label,formName);
    if (!formArray&&formName=='header') {
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.companiesForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='AlKhaldiLogistics'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.AlKhaldiLogisticsForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='FuelWay'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.FuelWayForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='AlkhaldiRealState'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.AlkhaldiRealStateForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='AlKhaldiBuilding'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.AlKhaldiBuildingForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='AutoGulf'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.AutoGulfForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='SaudiDrill'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.SaudiDrillForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='SaudiaFalcon'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.SaudiaFalconForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }else if(!formArray&&formName=='NewCompany'){
      formArray = this.fb.array([]); // Create a new FormArray if it doesn't exist
      this.newCompanyForm.setControl(label, formArray); // Set the FormArray to the companiesForm
    }

    const withLabel = this.fb.group({
      label: [null, Validators.required],
      labelAr: [null, Validators.required],
      image: ['', Validators.required],
    });

    formArray.push(withLabel); // Push the new form group to the FormArray
    this.added = true;
  }

  removeWithLabel(i: number,formName:string, label: string) {
    const formArray = this.getWithLabel(label,formName);
    if (formArray) {
      formArray.removeAt(i);
    }
  }



readAsBase64(event: Event, formName: string, index?: number) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement && inputElement.files && inputElement.files.length > 0 && index === undefined) {
    const files = Array.from(inputElement.files); // Convert FileList to array
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Value = base64String.split(',')[1]; // Split to get base64 data after comma

      const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
      let formControl = new FormControl();
      if (formName == 'header') {
        formControl = this.companiesForm.get(controlName) as FormControl
      }else if (formName == 'AlKhaldiLogistics') {
        formControl = this.AlKhaldiLogisticsForm.get(controlName) as FormControl
      }else if(formName == 'FuelWay'){
        formControl = this.FuelWayForm.get(controlName) as FormControl
      }else if(formName == 'AlKhaldiRealState'){
        formControl = this.AlkhaldiRealStateForm.get(controlName) as FormControl
      }else if(formName == 'AlKhaldiBuilding'){
        formControl = this.AlKhaldiBuildingForm.get(controlName) as FormControl
      }else if(formName == 'AutoGulf'){
        formControl = this.AutoGulfForm.get(controlName) as FormControl
      }else if(formName == 'SaudiDrill'){
        formControl = this.SaudiDrillForm.get(controlName) as FormControl
      }else if(formName == 'SaudiaFalcon'){
        formControl = this.SaudiaFalconForm.get(controlName) as FormControl
      }else if(formName == 'NewCompany'){
        formControl = this.newCompanyForm.get(controlName) as FormControl
      }

      if (formControl) {
        formControl.setValue(base64Value);
      } else {
        console.error(`FormControl '${controlName}' not found`);
      }
    };
    reader.readAsDataURL(file);
  }
}


onFileChange(event: Event, formName: string, index?: number, label?: string) {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement && inputElement.files && inputElement.files.length > 0 && index === undefined) {
    const files = Array.from(inputElement.files); // Convert FileList to array
    let base64Value: string | string[] = '';
    const controlName = inputElement.name.replace(/\.[^/.]+$/, ''); // Extract file name without extension
    let formControl = new FormControl();

    // Selecting the appropriate form control based on the formName
    switch (formName) {
      case 'header':
        formControl = this.companiesForm.get(controlName) as FormControl;
        break;
        case 'company':
        formControl = this.companyForm.get(controlName) as FormControl;
        break;
      case 'AlKhaldiLogistics':
        formControl = this.AlKhaldiLogisticsForm.get(controlName) as FormControl;
        break;
      case 'FuelWay':
        formControl = this.FuelWayForm.get(controlName) as FormControl;
        break;
      case 'AlkhaldiRealState':
        formControl = this.AlkhaldiRealStateForm.get(controlName) as FormControl;
        break;
      case 'AlKhaldiBuilding':
      formControl = this.AlKhaldiBuildingForm.get(controlName) as FormControl;
      break;
      case 'AutoGulf':
      formControl = this.AutoGulfForm.get(controlName) as FormControl;
      break;
      case 'SaudiDrill':
      formControl = this.SaudiDrillForm.get(controlName) as FormControl;
      break;
      case 'SaudiaFalcon':
      formControl = this.SaudiaFalconForm.get(controlName) as FormControl;
      break;
      case 'NewCompany':
      formControl = this.newCompanyForm.get(controlName) as FormControl;
      break;
      // Add other cases for formName
      default:
        console.error(`FormName '${formName}' not recognized`);
        return;
    }

    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        // Extracting base64 value from the data URL
        base64Value = base64String.split(',')[1];

        // Setting the value of the form control
        if (formControl) {
          formControl.setValue(base64Value);
        } else {
          console.error(`FormControl '${controlName}' not found`);
        }
      };

      reader.readAsDataURL(file);
    } else {
      const base64Array: { images: string }[] = [];

      // Processing multiple files
      files.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64String = reader.result as string;
          // Extracting base64 value from the data URL
          base64Value = base64String.split(',')[1];

          base64Array.push({ "images": base64Value });
        };

        reader.readAsDataURL(file);
      });

      // Patching the value to the form control
      if (formControl) {
        formControl.patchValue(base64Array);
      } else {
        console.error(`FormControl '${controlName}' not found`);
      }
    }
  } else if (inputElement && inputElement.files && inputElement.files.length > 0 && index !== undefined && index >= 0) {
    // Handling file uploads with index (assuming it's for a FormArray)
    if (inputElement.files.length > 1) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'You can only upload up to 1 image'});
      inputElement.files = null;
    } else if (inputElement.files.length === 1) {
      const files = Array.from(inputElement.files);
      const base64Value: string = '';
      const formArray = this.getWithLabel(label as any, formName);

      if (formArray) {
        const control = formArray.at(index) as FormArray;
        const controlImage = control.get('image');

        if (control) {
          const file = files[0];
          const reader = new FileReader();

          reader.onload = () => {
            const base64String = reader.result as string;
            // Extracting base64 value from the data URL
            const base64Value = base64String.split(',')[1];
            controlImage?.setValue(base64Value);
          };

          reader.readAsDataURL(file);
        } else {
          console.error("FormArray control is null.");
        }
      } else {
        console.error("FormArray is null.");
      }
    } else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'You must upload at least 1 image'});
      inputElement.files = null;
    }
  }
}




onSubmit(formName:string) {
  if(formName=="companiesForm"){
    if(this.companiesForm.value){
      let obj = {
        label: this.companiesForm.value.label,
        labelAr: this.companiesForm.value.labelAr,
        image: this.companiesForm.value.image.startsWith("http")||this.companiesForm.value.image.startsWith("https") ? null: this.companiesForm.value.image ,
      }
      this.dataService.sendData(obj,'companyHeader').subscribe((res:any)=>{
        if(res.success){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Header Updated Successfully' });
          this.reloadPage();
        }
      })
    }
  }else if(formName=="AlKhaldiLogisticsForm" &&!this.added){

  let obj={
    name:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsName,
    nameAr:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsNameAr,
    image:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsImage.startsWith("http")||this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsImage.startsWith("https") ? null: this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsImage,
    bio:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsBio,
    bioAr:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsBioAr,
    website:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsWebsite,
    logo:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsLogo.startsWith("http")||this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsLogo.startsWith("https") ? null: this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsLogo,
    supportImage:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsSupportImage.startsWith("http")||this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsSupportImage.startsWith("https") ? null: this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsSupportImage,
    detailsPdf:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsPdf.startsWith("http")||this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsPdf.startsWith("https") ? null: this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsPdf,
    brochuresPdf:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsBrochures.startsWith("http")||this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsBrochures.startsWith("https") ? null: this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsBrochures,
    imageWithLabel:this.AlKhaldiLogisticsForm.value.AlKhaldiLogisticsImageWithLabel

  }
  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }

    }
  })

  this.dataService.sendData(obj,'companyAlKhaldiLogistics').subscribe((res:any)=>{

    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'AlKhaldi Logistics Updated Successfully' });
      this.reloadPage();
    }
  })

 }else if(formName=="FuelWayForm"&&!this.added){

  let obj={
    name:this.FuelWayForm.value.FuelWayName,
    nameAr:this.FuelWayForm.value.FuelWayNameAr,
    image:this.FuelWayForm.value.FuelWayImage.startsWith("http")||this.FuelWayForm.value.FuelWayImage.startsWith("https") ? null: this.FuelWayForm.value.FuelWayImage,
    bio:this.FuelWayForm.value.FuelWayBio,
    bioAr:this.FuelWayForm.value.FuelWayBioAr,
    website:this.FuelWayForm.value.FuelWayWebsite,
    logo:this.FuelWayForm.value.FuelWayLogo.startsWith("http")||this.FuelWayForm.value.FuelWayLogo.startsWith("https") ? null: this.FuelWayForm.value.FuelWayLogo,
    supportImage:this.FuelWayForm.value.FuelWaySupportImage.startsWith("http")||this.FuelWayForm.value.FuelWaySupportImage.startsWith("https") ? null: this.FuelWayForm.value.FuelWaySupportImage,
    detailsPdf:this.FuelWayForm.value.FuelWayPdf.startsWith("http")||this.FuelWayForm.value.FuelWayPdf.startsWith("https") ? null: this.FuelWayForm.value.FuelWayPdf,
    brochuresPdf:this.FuelWayForm.value.FuelWayBrochures.startsWith("http")||this.FuelWayForm.value.FuelWayBrochures.startsWith("https") ? null: this.FuelWayForm.value.FuelWayBrochures,
    imageWithLabel:this.FuelWayForm.value.FuelWayImageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }

    }
  })
  this.dataService.sendData(obj,'companyFuelWay').subscribe((res:any)=>{
    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Fuel Way Updated Successfully' });
      this.reloadPage();
    }
  })
 }else if(formName=="AlkhaldiRealStateForm"&&!this.added){
  let obj={
    name:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateName,
    nameAr:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateNameAr,
    image:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateImage.startsWith("http")||this.AlkhaldiRealStateForm.value.AlkhaldiRealStateImage.startsWith("https") ? null: this.AlkhaldiRealStateForm.value.AlkhaldiRealStateImage.startsWith("http")||this.AlkhaldiRealStateForm.value.AlkhaldiRealStateImage.startsWith("https") ? null: this.AlkhaldiRealStateForm.value.AlkhaldiRealStateImage,
    bio:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateBio,
    bioAr:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateBioAr,
    website:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateWebsite,
    logo:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateLogo.startsWith("http")||this.AlkhaldiRealStateForm.value.AlkhaldiRealStateLogo.startsWith("https") ? null: this.AlkhaldiRealStateForm.value.AlkhaldiRealStateLogo,
    supportImage:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateSupportImage.startsWith("http")||this.AlkhaldiRealStateForm.value.AlkhaldiRealStateSupportImage.startsWith("https") ? null: this.AlkhaldiRealStateForm.value.AlkhaldiRealStateSupportImage,
    detailsPdf:this.AlkhaldiRealStateForm.value.AlkhaldiRealStatePdf.startsWith("http")||this.AlkhaldiRealStateForm.value.AlkhaldiRealStatePdf.startsWith("https") ? null: this.AlkhaldiRealStateForm.value.AlkhaldiRealStatePdf,
    brochuresPdf:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateBrochures.startsWith("http")||this.AlkhaldiRealStateForm.value.AlkhaldiRealStateBrochures.startsWith("https") ? null: this.AlkhaldiRealStateForm.value.AlkhaldiRealStateBrochures,
    imageWithLabel:this.AlkhaldiRealStateForm.value.AlkhaldiRealStateImageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }
    }
  })

  this.dataService.sendData(obj,'companyAlkhaldiRealState').subscribe((res:any)=>{
    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Alkhaldi Real State Updated Successfully' });
      this.reloadPage();
    }
  })

 }else if(formName=='AlKhaldiBuildingForm'&&!this.added){
  let obj={
    name:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingName,
    nameAr:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingNameAr,
    image:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingImage.startsWith("http")||this.AlKhaldiBuildingForm.value.AlKhaldiBuildingImage.startsWith("https") ? null: this.AlKhaldiBuildingForm.value.AlKhaldiBuildingImage,
    bio:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingBio,
    bioAr:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingBioAr,
    website:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingWebsite,
    logo:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingLogo.startsWith("http")||this.AlKhaldiBuildingForm.value.AlKhaldiBuildingLogo.startsWith("https") ? null: this.AlKhaldiBuildingForm.value.AlKhaldiBuildingLogo,
    supportImage:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingSupportImage.startsWith("http")||this.AlKhaldiBuildingForm.value.AlKhaldiBuildingSupportImage.startsWith("https") ? null: this.AlKhaldiBuildingForm.value.AlKhaldiBuildingSupportImage,
    detailsPdf:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingPdf.startsWith("http")||this.AlKhaldiBuildingForm.value.AlKhaldiBuildingPdf.startsWith("https") ? null: this.AlKhaldiBuildingForm.value.AlKhaldiBuildingPdf,
    brochuresPdf:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingBrochures.startsWith("http")||this.AlKhaldiBuildingForm.value.AlKhaldiBuildingBrochures.startsWith("https") ? null: this.AlKhaldiBuildingForm.value.AlKhaldiBuildingBrochures,
    imageWithLabel:this.AlKhaldiBuildingForm.value.AlKhaldiBuildingImageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }
    }
  })

  this.dataService.sendData(obj,'companyAlKhaldiBuilding').subscribe((res:any)=>{
    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Alkhaldi Building Updated Successfully' });
      this.reloadPage();
    }
  })

 }else if(formName =='AutoGulfForm'&&!this.added){
  let obj={
    name:this.AutoGulfForm.value.AutoGulfName,
    nameAr:this.AutoGulfForm.value.AutoGulfNameAr,
    image:this.AutoGulfForm.value.AutoGulfImage.startsWith("http")||this.AutoGulfForm.value.AutoGulfImage.startsWith("https") ? null: this.AutoGulfForm.value.AutoGulfImage,
    bio:this.AutoGulfForm.value.AutoGulfBio,
    bioAr:this.AutoGulfForm.value.AutoGulfBioAr,
    website:this.AutoGulfForm.value.AutoGulfWebsite,
    logo:this.AutoGulfForm.value.AutoGulfLogo.startsWith("http")||this.AutoGulfForm.value.AutoGulfLogo.startsWith("https") ? null: this.AutoGulfForm.value.AutoGulfLogo,
    supportImage:this.AutoGulfForm.value.AutoGulfSupportImage.startsWith("http")||this.AutoGulfForm.value.AutoGulfSupportImage.startsWith("https") ? null: this.AutoGulfForm.value.AutoGulfSupportImage,
    detailsPdf:this.AutoGulfForm.value.AutoGulfPdf.startsWith("http")||this.AutoGulfForm.value.AutoGulfPdf.startsWith("https") ? null: this.AutoGulfForm.value.AutoGulfPdf,
    brochuresPdf:this.AutoGulfForm.value.AutoGulfBrochures.startsWith("http")||this.AutoGulfForm.value.AutoGulfBrochures.startsWith("https") ? null: this.AutoGulfForm.value.AutoGulfBrochures,
    imageWithLabel:this.AutoGulfForm.value.AutoGulfImageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }
    }
  })
console.log(obj);

  this.dataService.sendData(obj,'companyAutoGulf').subscribe((res:any)=>{
    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Auto Gulf Updated Successfully' });
      this.reloadPage();
    }
  })
 }else if(formName == 'SaudiDrillForm'&&!this.added){
  let obj = {
    name: this.SaudiDrillForm.value.SaudiDrillName,
    nameAr: this.SaudiDrillForm.value.SaudiDrillNameAr,
    image: this.SaudiDrillForm.value.SaudiDrillImage.startsWith("http")||this.SaudiDrillForm.value.SaudiDrillImage.startsWith("https") ? null: this.SaudiDrillForm.value.SaudiDrillImage,
    bio: this.SaudiDrillForm.value.SaudiDrillBio,
    bioAr: this.SaudiDrillForm.value.SaudiDrillBioAr,
    website: this.SaudiDrillForm.value.SaudiDrillWebsite,
    logo: this.SaudiDrillForm.value.SaudiDrillLogo.startsWith("http")||this.SaudiDrillForm.value.SaudiDrillLogo.startsWith("https") ? null: this.SaudiDrillForm.value.SaudiDrillLogo,
    supportImage: this.SaudiDrillForm.value.SaudiDrillSupportImage.startsWith("http")||this.SaudiDrillForm.value.SaudiDrillSupportImage.startsWith("https") ? null: this.SaudiDrillForm.value.SaudiDrillSupportImage,
    detailsPdf: this.SaudiDrillForm.value.SaudiDrillPdf.startsWith("http")||this.SaudiDrillForm.value.SaudiDrillPdf.startsWith("https") ? null: this.SaudiDrillForm.value.SaudiDrillPdf,
    brochuresPdf: this.SaudiDrillForm.value.SaudiDrillBrochures.startsWith("http")||this.SaudiDrillForm.value.SaudiDrillBrochures.startsWith("https") ? null: this.SaudiDrillForm.value.SaudiDrillBrochures,
    imageWithLabel: this.SaudiDrillForm.value.SaudiDrillImageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }
    }
  })

  this.dataService.sendData(obj,'companySaudiDrill').subscribe((res:any)=>{
    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saudi Drill Updated Successfully' });
      this.reloadPage();
    }
  })
 }else if(formName =='SaudiaFalconForm'&&!this.added){
  let obj = {
    name: this.SaudiaFalconForm.value.SaudiaFalconName,
    nameAr: this.SaudiaFalconForm.value.SaudiaFalconNameAr,
    image: this.SaudiaFalconForm.value.SaudiaFalconImage.startsWith("http")||this.SaudiaFalconForm.value.SaudiaFalconImage.startsWith("https") ? null: this.SaudiaFalconForm.value.SaudiaFalconImage,
    bio: this.SaudiaFalconForm.value.SaudiaFalconBio,
    bioAr: this.SaudiaFalconForm.value.SaudiaFalconBioAr,
    website: this.SaudiaFalconForm.value.SaudiaFalconWebsite,
    logo: this.SaudiaFalconForm.value.SaudiaFalconLogo.startsWith("http")||this.SaudiaFalconForm.value.SaudiaFalconLogo.startsWith("https") ? null: this.SaudiaFalconForm.value.SaudiaFalconLogo,
    supportImage: this.SaudiaFalconForm.value.SaudiaFalconSupportImage.startsWith("http")||this.SaudiaFalconForm.value.SaudiaFalconSupportImage.startsWith("https") ? null: this.SaudiaFalconForm.value.SaudiaFalconSupportImage,
    detailsPdf: this.SaudiaFalconForm.value.SaudiaFalconPdf.startsWith("http")||this.SaudiaFalconForm.value.SaudiaFalconPdf.startsWith("https") ? null: this.SaudiaFalconForm.value.SaudiaFalconPdf,
    brochuresPdf: this.SaudiaFalconForm.value.SaudiaFalconBrochures.startsWith("http")||this.SaudiaFalconForm.value.SaudiaFalconBrochures.startsWith("https") ? null: this.SaudiaFalconForm.value.SaudiaFalconBrochures,
    imageWithLabel: this.SaudiaFalconForm.value.SaudiaFalconImageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }
    }
  })

  this.dataService.sendData(obj,'companySaudiFalcon').subscribe((res:any)=>{
    if(res.success){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saudi Falcon Updated Successfully' });
      this.reloadPage();
    }
  })

 }else if(formName =='newCompanyForm'&&!this.added){
  // debugger
  let obj = {
    name: this.newCompanyForm.value.name,
    nameAr: this.newCompanyForm.value.nameAr,
    image: this.newCompanyForm.value.image.startsWith("http")||this.newCompanyForm.value.image.startsWith("https") ? null: this.newCompanyForm.value.image,
    bio: this.newCompanyForm.value.bio,
    bioAr: this.newCompanyForm.value.bioAr,
    website: this.newCompanyForm.value.website,
    logo: this.newCompanyForm.value.logo.startsWith("http")||this.newCompanyForm.value.logo.startsWith("https") ? null: this.newCompanyForm.value.logo,
    supportImage: this.newCompanyForm.value.supportImage.startsWith("http")||this.newCompanyForm.value.supportImage.startsWith("https") ? null: this.newCompanyForm.value.supportImage,
    detailsPdf: this.newCompanyForm.value.detailsPdf.startsWith("http")||this.newCompanyForm.value.detailsPdf.startsWith("https") ? null: this.newCompanyForm.value.detailsPdf,
    brochuresPdf: this.newCompanyForm.value.brochuresPdf.startsWith("http")||this.newCompanyForm.value.brochuresPdf.startsWith("https") ? null: this.newCompanyForm.value.brochuresPdf,
    imageWithLabel: this.newCompanyForm.value.imageWithLabel
  }

  obj.imageWithLabel.map((item:any)=>{
    if (item.image !== null) {
      if(item.image.startsWith("http")||item.image.startsWith("https")){
        item.image=null
      }
    }
  })

  this.dataService.sendData(obj,'AddCompany').subscribe((res:any)=>{
    if(res.success){
      this.newCompanyAdded = res.result;
      // this.newCompany_id = this.newCompanyAdded._id;
      // this.newCompanyName = this.newCompanyAdded.name;
      // const addedCompany = {_id: this.newCompany_id, name: this.newCompanyName}
      // this.newCompanies.push(addedCompany); 
      // console.log(this.newCompany_id)
      // console.log(this.newCompanies)
      // this.saveAddedCompanies();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company Added Successfully' });
      // this.reloadPage();
    }
  })

 }
 this.added = false;
}
reloadPage() {
  window.location.reload();
}

// saveAddedCompanies() {
//   localStorage.setItem('newCompanies', JSON.stringify(this.newCompanies));
// }

// loadAddedCompanies() {
//   const storedCompanies = localStorage.getItem('newCompanies');
//   if (storedCompanies) {
//     this.newCompanies = JSON.parse(storedCompanies);
//   }
// }

getAddedCompanies(){

  this.cols = [
    {
      field: 'name',
      header: 'Name',
      rowType: DataTableRowType.NORMAL,
    },
    {
      field: 'createdAt',
      header: 'Created at',
      rowType: DataTableRowType.DATE,
    },
  ];
  // debugger
  this.dataService.getData('getAddedCompany').subscribe((res: any) => {
      this.newCompanyData = res.result;
      console.log(this.newCompanyData);
      // if (this.AlKhaldiLogistics) {
      //   this.AlKhaldiLogisticsForm.setControl('AlKhaldiLogisticsImageWithLabel', this.fb.array([]));
      //   const AlKhaldiLogisticsImageWithLabelArray = this.AlKhaldiLogisticsForm.get('AlKhaldiLogisticsImageWithLabel');

      //   this.AlKhaldiLogistics.imageWithLabel.forEach((imageLabel: any) => {
      //     const AlKhaldiLogisticsForm = this.fb.group({
      //         label: [imageLabel.label, Validators.required],
      //         labelAr: [imageLabel.labelAr, Validators.required],
      //         image: [imageLabel.image, Validators.required],
      //     });
      //     (AlKhaldiLogisticsImageWithLabelArray as any).push(AlKhaldiLogisticsForm);
      // });

      //   this.AlKhaldiLogisticsForm.patchValue({
      //     AlKhaldiLogisticsName: this.AlKhaldiLogistics.name,
      //     AlKhaldiLogisticsNameAr: this.AlKhaldiLogistics.nameAr,
      //     AlKhaldiLogisticsBio: this.AlKhaldiLogistics.bio,
      //     AlKhaldiLogisticsBioAr: this.AlKhaldiLogistics.bioAr,
      //     AlKhaldiLogisticsLogo: this.AlKhaldiLogistics.logo,
      //     AlKhaldiLogisticsImage: this.AlKhaldiLogistics.image,
      //     AlKhaldiLogisticsSupportImage: this.AlKhaldiLogistics.supportImage,
      //     AlKhaldiLogisticsPdf: this.AlKhaldiLogistics.detailsPdf,
      //     AlKhaldiLogisticsBrochures: this.AlKhaldiLogistics.brochuresPdf,
      //     AlKhaldiLogisticsWebsite: this.AlKhaldiLogistics.website,
      //   })
      // }
    })
}

callAction(data: any) {
  // let idsArr = data.action == 'deleteMultiple' ? data.id : [];
  // this.carrerIds = data.action != 'deleteMultiple' ? data.id : null;
  switch (data.action) {
    case 'add':
      this.router.navigate(['/authentication/adminpanel/cms-companies/cms-add-company']);
      break;
    case 'edit':
      this.router.navigate(['/authentication/adminpanel/cms-companies/cms-edit-company'], { state: { id: data.id } });
      break;
    case 'delete':
      this.removeForm(data.id);
      break;
    default:
      break;
  }
}

// onTabChange(event: any){
//   const selectedCompany = this.newCompanies[event.index];
//     if (selectedCompany) {
//       this.getAddedCompany(selectedCompany._id);
//     }
// }

get getCompanyForm() {
  return this.companyForm.get('companyFormArray') as FormArray;
}

initializeCompanyForm() {
  this.companyForm = this.fb.group({
    companyFormArray: this.fb.array([
      this.fb.group({
        _id: [null, Validators.required],
        name: [null, Validators.required],
        nameAr: [null, Validators.required],
        image: ['', Validators.required],
        bio: [null, Validators.required],
        bioAr: [null, Validators.required],
        website: [null, Validators.required],
        logo: ['', Validators.required],
        supportImage: ['', Validators.required],
        brochuresPdf: [null, Validators.required],
        detailsPdf: [null, Validators.required],
        label: [null, Validators.required],
        LabelAr: [null, Validators.required],
        imageWithLabel: this.fb.array([])
      }),
    ]),
  });
}

setImageWithLabel(imgs: any[]) {
  const imgArray = imgs.map(img => this.fb.group ({
    image: [img.image],
    label: [img.label],
    labelAr: [img.labelAr],
  }));
  const imgFormArray = this.fb.array(imgArray);
  this.companyForm.setControl('imageWithLabel', imgFormArray);
}

onCompanySubmit(formName: string) {
  if (formName == 'companyForm') {
    debugger
    this.company = this.companyForm.value;
    const imageWithLabel = this.company.imageWithLabel.map((img: any) => ({
      image: this.company.image,
      label: this.company.label,
      labelAr: this.company.labelAr,
    }));
    this.company.companyFormArray.forEach((element: any) => {
      if (element) {
        const obj = {
          name: element.name,
          nameAr: element.nameAr,
          image: element.image && !element.image.startsWith('http') && !element.image.startsWith('https')
                        ? element.image
                        : null,
          bio: element.bio,
          bioAr: element.bioAr,
          website: element.website,
          logo: element.logo && !element.logo.startsWith('http') && !element.logo.startsWith('https')
          ? element.logo
          : null,
          supportImage: element.supportImage && !element.supportImage.startsWith('http') && !element.supportImage.startsWith('https')
          ? element.supportImage
          : null,
          brochuresPdf: element.brochuresPdf,
          detailsPdf: element.detailsPdf,
          imageWithLabel: imageWithLabel
        };
        const sendDataObservable = this.dataService.sendData(
          obj,
          'AddCompany',
          element._id ? element._id : null
        )
        if (sendDataObservable) {
          sendDataObservable.subscribe(
            (res: any) => {
              if (res.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.message,
                });
                this.reloadPage();
              } else {
                // Handle error response
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.message,
                });
              }
            },
            (error: any) => {
              // Handle HTTP error
              console.error('Error:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'An error occurred while sending data.',
              });
            }
          );
        } else {
          console.error('sendDataObservable is undefined');
        }
      } else {
        console.error('Element or _id is missing:', element);
      }
    });

  }
}

addForm(formName: string, event: Event) {
  event.preventDefault();
  if (formName == 'companyForm') {
    this.getCompanyForm?.push(
      this.fb.group({
        _id: [null, Validators.required],
        name: [null, Validators.required]
      })
    );
    this.isAdded = true;
  }
}

// removeForm(index: number, formName: string, event: Event) {
//   event.preventDefault();
//   if(formName == 'companyForm') {
//     this.isAdded = true;
//     this.confirmationService.confirm({
//       message: 'Do you want to delete this record?',
//       header: 'Delete Confirmation',
//       icon: 'pi pi-info-circle',
//       accept: () => {
//         const itemId = this.getCompanyForm.get('_id')?.value;
//         if (itemId) {
//           this.dataService
//             .deleteData('AddCompany', itemId)
//             .subscribe((res: any) => {
//               if (res.success) {
//                 this.messageService.add({
//                   severity: 'success',
//                   summary: 'Success',
//                   detail: res.message,
//                 });
//                 this.getCompanyForm.removeAt(index);
//               }
//             });
//         }
//         this.getCompanyForm.removeAt(index);
//       },
//       reject: () => {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Rejected',
//           detail: 'You have rejected',
//         });
//       },
//     });
//   }
// }

removeForm(_id: any) {
  // debugger
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        // const formIndex = this.getCompanyForm.controls.findIndex((control) => control.get('_id')?.value === this.getCompanyForm.get('_id')?.value);
        // if (formIndex !== -1) {
        //   const itemId = this.getCompanyForm.at(formIndex).get('_id')?.value;
        //   if (itemId) {
        //     this.dataService.deleteData('AddCompany', this.newCompany_id).subscribe(
        //       (res: any) => {
        //         if (res.success) {
        //           this.messageService.add({
        //             severity: 'success',
        //             summary: 'Success',
        //             detail: res.message,
        //           });
        //           // this.getCompanyForm.removeAt(formIndex);
        //           this.getAddedCompanies()
        //         }
        //       },
        //       () => {
        //         this.messageService.add({
        //           severity: 'error',
        //           summary: 'Error',
        //           detail: 'An error occurred while deleting the record.',
        //         });
        //       }
        //     );
        //   }
        // }

        this.CRUDService.delete(_id, 'admin/cms/company').subscribe(
          (res: any) => {
            if (res.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });
              this.getAddedCompanies()
            }
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred while deleting the record.',
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
}

getCompanyData() {
  this.dataService.getData('AddCompany').subscribe((res: any) => {
    // debugger
    this.company = res.result;
    // console.log(this.company)
    if (this.company) {
      this.companyForm.setControl('companyFormArray', this.fb.array([]));
      this.company.forEach((element: any) => {
        // console.log(element)
        const company = this.fb.group({
          _id: [element._id, Validators.required],
          label: [element.label, Validators.required],
          labelAr: [element.labelAr, Validators.required],
          // type: [''],
          // isImage: [element.image !== null],
          // isVideo: [element.video !== null],
          // image: [element.image],
          // video: [element.video]
        });
        (this.companyForm.get('companyFormArray') as FormArray).push(company);
      });
    }
  });
}

close() {
  this.display = false;
  this.getAddedCompanies();
}

}
