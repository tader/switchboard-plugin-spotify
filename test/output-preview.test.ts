import { test } from 'node:test';
import assert from 'node:assert/strict';
import setup from '../plugins/spotify/index.ts';

test('only the local user-OAuth current profile account_id is declared for capture', () => {
  const methods: any[] = [];
  const instance = setup({
    settings: { clientId: 'synthetic-client', clientSecret: 'synthetic-client-secret' },
    require: () => ({
      authorizationCode: (options: any) => { methods.push(options); return options; },
      clientCredentials: (options: any) => { methods.push(options); return options; },
    }),
  } as any);
  const service = instance.services[0];
  assert.deepEqual(service.outputPreviews, [{
    origin: 'https://api.spotify.com', method: 'GET', path: '/v1/me',
    authMethods: ['oauth'], fields: { account_id: { maxBytes: 128 } },
  }]);
  assert.equal(methods[1].id, 'app');
  assert.ok(!service.outputPreviews[0].authMethods.includes(methods[1].id));
  // Synthetic upstream fixture: core's allowlist discards every other field.
  const fixture = { account_id: 'demo-account', id: 'user-id', email: 'private@example.test', images: [{ url: 'https://example.test/private' }], token: 'synthetic-secret', nested: { value: 'synthetic-secret' } };
  const selected = Object.fromEntries(Object.keys(service.outputPreviews[0].fields).map(k => [k, fixture[k as keyof typeof fixture]]));
  assert.deepEqual(selected, { account_id: 'demo-account' });
});
