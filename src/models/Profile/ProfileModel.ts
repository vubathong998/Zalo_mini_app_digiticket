export type ProfileInterface = ProfileResponse & {};

export type ProfileResponse = {
  Active: boolean;
  CityId: number;
  CityName: string;
  CompanyAddress: string | null;
  Address: string | null;
  CompanyRepresentative: string | null;
  CompanyTaxCode: string | null;
  Contacts: [
    {
      Address: string;
      EmailAddress: string;
      FirstName: string;
      Gender: boolean;
      Id: string;
      LastName: string;
      Phone: string;
      Tax: string;
      Title: string;
    }
  ];
  Description: string;
  DistrictId: number;
  DistrictName: string;
  Id: string;
  IdentityType: number;
  IsCompany: false;
  IsPublic: boolean;
  Name: string;
  WardId: number;
  WardName: string;
  IdentityReference: string | null;
  Code: string;
  TotalPoint: number;

  // Address: string;
  // Avatar: string;
  // Birthday: string;
  // DisplayName: string;
  // Email: string;
  // FirstName: string;
  // Gender: boolean;
  // Id: number;
  // LastName: string;
  // PhoneNumber: string;
  // UserName: string;
};
