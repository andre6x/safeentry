import {SummaryModel} from "../data/summary.model";

export class ResponseStatus {
  constructor(public message?: string,
              public success?: boolean,
              public code?: number,
              public idEntity?: number,
              public summary?: SummaryModel) {
  }
}

