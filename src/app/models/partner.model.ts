export class Partner {
  importance: number;
  link: string;
  logo: PartnerLogo;
  partnerLevel: string;
  title: string;
}

export class PartnerGroup {
  class: string;
  list: Partner[];
  name: string;
}

export class PartnerLogo {
  url: string;
}
