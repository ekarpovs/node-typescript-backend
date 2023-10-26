import { authorization } from '@ekarpovs/authorization-checker';
import { ModelType, rulesRepository } from '@ekarpovs/authorization-repo-mongo';

// Once only - populate the authorization definitions to DB
// import { initRules } from '@ekarpovs/authorization-repo-mongo';
// import { aclData } from './authorization-definitions';
// import { rbacData } from './authorization-definitions';

export const setupAuthorization = () => {
  // Once only - populate the authorization definitions to DB
  // initRules(ModelType.ACL, aclData);
  // initRules(ModelType.RBAC, rbacData);

  // Init rules repository
  const rulesRepo = rulesRepository(ModelType.ACL);
  // Init the authorization package
  return authorization({ rulesRepo });
};
