import { DriverPOC } from "./types";

export default abstract class BaseProvider {
  abstract getCandidateList(): Promise<DriverPOC.Candidate[]>;
  abstract getPackages(): Promise<DriverPOC.Package[]>;
  abstract getCandidateInfo(id: number): Promise<DriverPOC.Candidate>;
  abstract enrollCandidate(
    person: DriverPOC.Person,
    enrolledPackage: DriverPOC.Package
  ): Promise<DriverPOC.Beneficiary>;
  abstract getBeneficiariesList(): Promise<DriverPOC.Beneficiary[]>;
  abstract validateBeneficiaries(
    beneficiares: DriverPOC.Beneficiary[]
  ): Promise<DriverPOC.Beneficiary[]>;
  abstract executePayments(): any;
}