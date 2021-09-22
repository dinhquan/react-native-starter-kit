const mocks = [
  {
    path: 'signIn',
    data: require('./data/signInResponse.json'),
    enabled: true,
  },
  {
    path: 'posts',
    data: require('./data/posts.json'),
    enabled: true,
  },
];

function pathFromUrl(url: string): string {
  const reg = /.+?:\/\/.+?(\/.+?)(?:#|\?|$)/;
  const pathname = reg.exec(url)?.[1]?.substring(1) ?? '';
  return pathname;
}

export function isMockEnabled(url: string): boolean {
  const path = pathFromUrl(url);
  let filteredMocks = mocks.filter(x => x.path === path);
  return filteredMocks.length > 0 && filteredMocks[0].enabled;
}

export function mockData(url: string): Promise<any> {
  const path = pathFromUrl(url);
  let filteredMocks = mocks.filter(x => x.path === path);
  if (!filteredMocks.length) {
    return Promise.reject({status: 404, message: 'Mock data not found'});
  }
  let mock = filteredMocks[0];
  if (!mock.data) {
    return Promise.reject({status: 404, message: 'Mock data not found'});
  }
  return Promise.resolve(mock.data);
}
