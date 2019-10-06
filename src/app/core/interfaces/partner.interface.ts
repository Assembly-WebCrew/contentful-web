export interface Partner {
  importance: number;
  link: string;
  logo: PartnerLogo;
  partnerLevel: string;
  title: string;
}

export interface PartnerGroup {
  class: string;
  list: Partner[];
  name: string;
}

export interface PartnerLogo {
  url: string;
}
