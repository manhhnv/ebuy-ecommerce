import { PolicyHandler } from './policy.config';
import { SetMetadata } from "@nestjs/common"

export const CHECK_POLICIES_KEY = "KO8Wn2mgycvxRPXaigtHOkgD+qkaE1Rqtfv84ULA00Xh8M1E9Ew0L1vem/bRN/Mpurva8o1Hlb9DBkyCjlmjCg=="
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);