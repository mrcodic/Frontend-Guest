import { ID } from '../shared/ServicesBase';

export interface CMSTeam {
  _id: ID;
  title: string;
  paragraph: string;
  header: { label: string; labelAr: string; image: string | null };
  members: {
    _id: ID | null;
    name: string;
    role: string;
    bio: string;
    nameAr: string;
    roleAr: string;
    bioAr: string;
    image: string | null;
  }[];
}
export interface CMSGallery {
  _id: ID;
  header: { label: string; labelAr: string; image: string | null };
  gallery: {
    _id: ID | null;
    category: string;
    label: string;
    title: string;
    labelAr: string;
    titleAr: string;
    link: string;
    image: string;
  }[];
}

export interface CMSGalleryCategory {
  _id?: ID | null;
  name: string;
}

export interface Companies {
  key?: string;
  name: string;
  bio: string;
  logo?: string;
  nameAr: string;
  bioAr: string;
  website: string;
  image: string | null;
  imageWithLabel: { image: string | null; label: string; labelAr: string }[];
}
export interface CMSCompanies {
  _id: ID;
  header: { label: string; labelAr: string; image: string | null };
  supportImage?:string | null;
  brochuresPdf:string | null;
  detailsPdf:string | null;
  AlKhaldiLogistics: Companies;
  FuelWay: Companies;
  AlkhaldiRealState: Companies;
  AlKhaldiBuilding: Companies;
  AutoGulf: Companies;
  SaudiDrill: Companies;
  SaudiaFalcon: Companies;
}
export interface CMSNews {
  _id: ID;
  header: { label: string; image: string | null };
  news: {
    _id: ID | null;
    content: string;
    title: string;
    link: string;
    image: string;
  }[];
}
export interface CMSHome {
  _id: ID;
  header: {
    _id: ID | null;
    label: string;
    labelAr: string;
    image: string | null;
  }[];
  statistics: {
    _id: ID | null;
    label: string;
    value: string;
    labelAr: string;
    valueAr: string;
  }[];
  timeLine: {
    _id: ID | null;
    year: string;
    label: string;
    labelAr: string;
    image: string | null;
  }[];
  industries: {
    _id: ID | null;
    label: string;
    labelAr: string;
    link: string;
    image: string | null;
  }[];
  partners: {
    _id: ID | null;
    image: string | null;
  }[];
}

export interface CMSWhoWeAre {
  _id: ID;
  title: string;
  content: string;
  titleAr: string;
  contentAr: string;
  images: { _id: ID | null; image: string | null }[];
  image: string | null;
}
export interface CMSHeaderSocial {
  label: string; 
  labelAr: string; 
  image: string | null;
}

export interface CMSAddSocial {
  image: string | null;
  title: string; 
  titleAr: string; 
  content: string;
  contentAr: string;
}

export interface CMSEditSocial {
  _id: ID;
  image: string | null;
  title: string; 
  titleAr: string; 
  content: string;
  contentAr: string;
}

export interface AddedSocialData {
  _id: ID;
  title: string;
  createdAt: string;
}

export interface CMSBoard {
  _id: ID;
  header: { label: string; labelAr: string; image: string | null };
  message: {
    name: string;
    nameAr: string;
    content: string;
    contentAr: string;
    image: string | null;
  };
  members: {
    _id: ID | null;
    name: string;
    nameAr: string;
    image:[]| string | null;
  }[];
}

export interface CMSAddedCompany {
  _id: ID;
  name: string;
  createdAt: string;
}
