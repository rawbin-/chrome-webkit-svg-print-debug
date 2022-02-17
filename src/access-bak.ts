/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function accessBak(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
