export type CertificateItemTypes = {
  certificateID: string;
  certificateName: string;
  certificateLink: string;
  isActive: boolean;
  advisor: {
    advisorID: string;
    accountID: string;
    height: string;
    weight: string;
  };
  accountPhoto: string;
  fullName: string;
};



export type CreateNewCertificateTypes = {
  certificateID: string;
  certificateName: string;
  certificateLink: string;
  status: string;
  advisor: {
    advisorID: string;
    accountID: string;
    height: string;
    weight: string;
  };
};

export type UpdateCertificateTypes = {
  certificateID: number;
  certificateName: string;
  certificateLink: string;
  isActive: boolean;
};

export type CreateCertificateRequest = {
  certificateName: string;
  certificateLink: string;
  advisorID: number;
};
