export type CertificateItemTypes = {
  certificateID: string,
  certificateName: string,
  certificateLink: string,
  status: string,
  advisor: {
    advisorID: string,
    accountID: string,
    height: string,
    weight: string,
  }
};

export type CreateNewCertificateTypes = {
  certificateID: string,
  certificateName: string,
  certificateLink: string,
  status: string,
  advisor: {
    advisorID: string,
    accountID: string,
    height: string,
    weight: string,
  }
};

export type UpdateCertificateTypes = {
  certificateID: string,
  certificateName: string,
  certificateLink: string,
  status: string,
  advisor: {
    advisorID: string,
    accountID: string,
    height: string,
    weight: string,
  }
};
