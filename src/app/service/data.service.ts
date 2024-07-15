import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { ApiEndpoints } from '../api-endpoints.enum';
ApiEndpoints
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl=environment.API_URL
  constructor(private http: HttpClient) {}
  sendData(data: any , url: string , id?: string): Observable<any>|any {
    if(url =='board'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminBoard+id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.adminBoard, data );
  }else if(url =='whoweare'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminWhoWeAre+id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.adminWhoWeAre, data );
  }else if(url =='whoweareTimeline'){
    console.log(this.apiUrl+ApiEndpoints.adminWhoWeAreTimeline+id);
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminWhoWeAreTimeline+id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.adminWhoWeAreTimeline, data );
  }else if(url =='companyHeader'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanyHeader, data );
  }else if(url =='AddCompany'){
    return  this.http.post(this.apiUrl+ApiEndpoints.adminAddCompany, data );
  }else if(url =='AddCompany'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminAddCompany + id, data );
  }
  else if(url =='companyAlKhaldiLogistics'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanyAlKhaldiLogistics, data );
  }else if(url=='companyFuelWay'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanyFuelWay, data );
  }else if(url=='companyAlkhaldiRealState'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanyAlkhaldiRealState, data );
  }else if(url=='companyAlKhaldiBuilding'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanyAlKhaldiBuilding, data );
  }else if(url=='companyAutoGulf'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanyAutoGulf, data );
  }else if(url=='companySaudiDrill'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanySaudiDrill, data );
  }else if(url=='companySaudiFalcon'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.adminCompanySaudiFalcon, data );
  }else if(url=='homeHeader'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminHomeHeader+id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.adminHomeHeader, data );
  }else if(url=='homeAboutUS'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminHomeAboutUS+id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.adminHomeAboutUS, data );
  }else if(url=='homeTimeline'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminHomeTimeline+id, data ) :  this.http.patch(this.apiUrl+ApiEndpoints.adminHomeTimeline, data );
  }else if(url=='homeIndustry'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminHomeIndustry+id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.adminHomeIndustry, data );
  }else if(url=='homePartner'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminHomePartner+id, data ) :  this.http.patch(this.apiUrl+ApiEndpoints.adminHomePartner, data );
  }else if(url=='homeStatistics'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.adminHomeStatistics+id, data ) :  this.http.patch(this.apiUrl+ApiEndpoints.adminHomeStatistics, data );
  }else if(url=='categoryChildren'){
    return  this.http.post(this.apiUrl+ApiEndpoints.categoryChildren,data);
  }else if (url=='add-blog'){
    return  this.http.post(this.apiUrl+ApiEndpoints.addBlog,data);
  }else if (url=='edit-blog'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.editBlog + id, data);
  }else if (url=='filter-news'){
    return  this.http.patch(this.apiUrl+ApiEndpoints.filterNews,data);
  }else if(url=='adminMessages'){
    return  id? this.http.patch(this.apiUrl+ApiEndpoints.adminMessages+id, data ) :  this.http.patch(this.apiUrl+ApiEndpoints.adminMessages, data );
  }else if(url=='timeLineHeader'){
    return this.http.patch(this.apiUrl+ApiEndpoints.timeLineHeader + id!, data );
  }else if(url=='socialMediaCMS'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.socialMediaCMS + id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.socialMedia, data );
  }else if(url=='whoWeAretimeLineHeader'){
    return id? this.http.patch(this.apiUrl+ApiEndpoints.whoWeAretimeLineHeader + id, data ) : this.http.patch(this.apiUrl+ApiEndpoints.whoWeAretimeLineHeader, data );
  }
}
  getData(url: string, id?: string): Observable<any>|any {
    if(url =='board'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminBoard);
    }else if(url =='whoweare'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminWhoWeAre);
    }else if(url =='companyHeader'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminCompanyHeader);
    }else if(url =='AddCompany'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminAddCompany);
    }  else if(url =='companyAlKhaldiLogistics'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanyAlKhaldiLogistics );
    }else if(url=='companyFuelWay'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanyFuelWay );
    }else if(url=='companyAlkhaldiRealState'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanyAlkhaldiRealState );
    }else if(url=='companyAlKhaldiBuilding'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanyAlKhaldiBuilding );
    }else if(url=='companyAutoGulf'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanyAutoGulf );
    }else if(url=='companySaudiDrill'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanySaudiDrill );
    }else if(url=='companySaudiFalcon'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminCompanySaudiFalcon );
    }else if(url=='getAddedCompany'){
      return  this.http.get(this.apiUrl+ApiEndpoints.adminGetCompany );
    }else if(url=='homeHeader'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminHomeHeader);
    }else if(url=='homeTimeline'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminHomeTimeline);
    }else if(url=='homeAboutUS'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminHomeAboutUS);
    }else if(url=='homeIndustry'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminHomeIndustry);
    }else if(url=='homePartner'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminHomePartner);
    }else if(url=='homeStatistics'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminHomeStatistics);
    }else if(url=='home'){
      return this.http.get(this.apiUrl+ApiEndpoints.landingHome);
    }else if(url=='category'){
      return this.http.get(this.apiUrl+ApiEndpoints.category);
    }else if(url=='tags'){
      return id? this.http.get(this.apiUrl+ApiEndpoints.tags+id): this.http.get(this.apiUrl+ApiEndpoints.tags);
    }else if(url=='news'){
      return this.http.get(this.apiUrl+ApiEndpoints.getNews+id);
    }else if(url=='homeMessages'){
      return this.http.get(this.apiUrl+ApiEndpoints.adminMessages);
    }else if (url=='dashboardCard'){
      return this.http.get(this.apiUrl+ApiEndpoints.dashboardCard);
    }else if (url=='dashboardChart'){
      return this.http.get(this.apiUrl+ApiEndpoints.dashboardChart);
    }else if (url=='socialMedia'){
      return this.http.get(this.apiUrl+ApiEndpoints.socialMedia);
    }else if (url=='timeLineHeader'){
      return this.http.get(this.apiUrl+ApiEndpoints.timeLineHeader);
    }else if (url=='whoWeAretimeLineHeader'){
      return this.http.get(this.apiUrl+ApiEndpoints.whoWeAretimeLineHeader);
    }else if (url=='partners'){
      return this.http.get(this.apiUrl+ApiEndpoints.partners);
    }
  }
  deleteData(url:string, id:string): Observable<any>|any{
    if(url == 'homeHeader'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminHomeHeader+id);
    }else if(url == 'homeTimeline'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminHomeTimeline+id);
    }else if(url == 'homeAboutUS'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminHomeAboutUS+id);
    }else if(url == 'homeIndustry'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminHomeIndustry+id);
    }else if(url == 'homePartner'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminHomePartner+id);
    }else if(url == 'homeStatistics'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminHomeStatistics+id);
    }else if(url == 'AddCompany'){
      return this.http.delete(this.apiUrl+ApiEndpoints.adminAddCompany+id);
    }
  }
}

