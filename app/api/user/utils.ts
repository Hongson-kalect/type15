export const trimingAppUser = (appUser: any) => {
  return {
    id: appUser.id,
    username: appUser.username,
    languageId: appUser.languageId,
    // userId: appUser.user,
    scope: appUser.scope,
    // Include related models as they are
    asset: appUser.asset,
    setting: appUser.setting,
    user: appUser.user,
  };
};
