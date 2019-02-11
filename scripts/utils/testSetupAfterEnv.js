import { queryMock } from './queryMock';

beforeEach(() => {
  queryMock.setup(process.env.GRAPHQL_ORIGIN);
});