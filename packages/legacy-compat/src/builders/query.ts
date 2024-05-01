/**
 * @module @ember-data/legacy-compat/builders
 */
import { assert } from '@ember/debug';

import { SkipCache } from '@ember-data/request';
import type { ImmutableRequestInfo } from '@ember-data/request/-private/types';

import { normalizeModelName } from './utils';

type QueryRequestInput<T extends string = string> = ImmutableRequestInfo & {
  op: 'query';
  data: {
    type: T;
    query: Record<string, unknown>;
    options: QueryBuilderOptions;
  };
};

type QueryBuilderOptions = {
  [K in string | 'adapterOptions']?: K extends 'adapterOptions' ? Record<string, unknown> : unknown;
};

/**
  This function builds a request config for a given type and query object.
  When passed to `store.request`, this config will result in the same behavior as a `store.query` request.
  Additionally, it takes the same options as `store.query`.

  All `@ember-data/legacy-compat` builders exist to enable you to migrate your codebase to using the correct syntax for `store.request` while temporarily preserving legacy behaviors.
  This is useful for quickly upgrading an entire app to a unified syntax while a longer incremental migration is made to shift off of adapters and serializers.
  To that end, these builders are deprecated and will be removed in a future version of Ember Data.

  @method query
  @deprecated
  @public
  @static
  @for @ember-data/legacy-compat/builders
  @param {string} type the name of the resource
  @param {object} query a query to be used by the adapter
  @param {QueryBuilderOptions} [options] optional, may include `adapterOptions` hash which will be passed to adapter.query
  @return {QueryRequestInput} request config
*/
export function queryBuilder(
  type: string,
  query: Record<string, unknown>,
  options?: QueryBuilderOptions
): QueryRequestInput<string>;
export function queryBuilder(
  type: string,
  query: Record<string, unknown>,
  options?: QueryBuilderOptions
): QueryRequestInput;
export function queryBuilder(
  type: string,
  query: Record<string, unknown>,
  options: QueryBuilderOptions = {}
): QueryRequestInput {
  assert(`You need to pass a model name to the query builder`, type);
  assert(`You need to pass a query hash to the query builder`, query);
  assert(
    `Model name passed to the query builder must be a dasherized string instead of ${type}`,
    typeof type === 'string'
  );

  return {
    op: 'query' as const,
    data: {
      type: normalizeModelName(type),
      query,
      options: options,
    },
    cacheOptions: { [SkipCache as symbol]: true },
  };
}

type QueryRecordRequestInput<T extends string = string> = ImmutableRequestInfo & {
  op: 'queryRecord';
  data: {
    type: T;
    query: Record<string, unknown>;
    options: QueryBuilderOptions;
  };
};

/**
  This function builds a request config for a given type and query object.
  When passed to `store.request`, this config will result in the same behavior as a `store.queryRecord` request.
  Additionally, it takes the same options as `store.queryRecord`.

  All `@ember-data/legacy-compat` builders exist to enable you to migrate your codebase to using the correct syntax for `store.request` while temporarily preserving legacy behaviors.
  This is useful for quickly upgrading an entire app to a unified syntax while a longer incremental migration is made to shift off of adapters and serializers.
  To that end, these builders are deprecated and will be removed in a future version of Ember Data.

  @method queryRecord
  @deprecated
  @public
  @static
  @for @ember-data/legacy-compat/builders
  @param {string} type the name of the resource
  @param {object} query a query to be used by the adapter
  @param {QueryBuilderOptions} [options] optional, may include `adapterOptions` hash which will be passed to adapter.query
  @return {QueryRecordRequestInput} request config
*/
export function queryRecordBuilder(
  type: string,
  query: Record<string, unknown>,
  options?: QueryBuilderOptions
): QueryRecordRequestInput<string>;
export function queryRecordBuilder(
  type: string,
  query: Record<string, unknown>,
  options?: QueryBuilderOptions
): QueryRecordRequestInput;
export function queryRecordBuilder(
  type: string,
  query: Record<string, unknown>,
  options?: QueryBuilderOptions
): QueryRecordRequestInput {
  assert(`You need to pass a model name to the queryRecord builder`, type);
  assert(`You need to pass a query hash to the queryRecord builder`, query);
  assert(
    `Model name passed to the queryRecord builder must be a dasherized string instead of ${type}`,
    typeof type === 'string'
  );

  return {
    op: 'queryRecord',
    data: {
      type: normalizeModelName(type),
      query,
      options: options || {},
    },
    cacheOptions: { [SkipCache as symbol]: true },
  };
}
