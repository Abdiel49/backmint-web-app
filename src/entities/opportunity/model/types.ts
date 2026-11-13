export type OpportunitySourceType = "Project" | "Call";
export type FundingDirection = "FundingOffered" | "FundingRequested";
export type Visibility = "Private" | "Unlisted" | "Public";
export type IntakeStatus = "Open" | "Paused" | "Closed";

export type Opportunity = {
  direction: FundingDirection;
  intakeStatus: IntakeStatus;
  sourceId: string;
  sourceType: OpportunitySourceType;
  title: string;
  visibility: Visibility;
};
