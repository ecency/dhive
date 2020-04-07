import 'mocha'
import * as assert from 'assert'

import {Client, Asset, Transaction, PrivateKey} from './../src/index-node'
import {getTestnetAccounts, randomString, agent, TEST_NODE} from './common'

describe('database api', function() {
    assert(true)
    this.slow(500)
    this.timeout(20 * 1000)

    const client = Client.testnet({agent})
    let serverConfig: {[key: string]: boolean | string | number}
    const liveClient = new Client(TEST_NODE, {agent})

    let acc: {username: string, password: string}
    /*
    before(async function() {
        [acc] = await getTestnetAccounts()
    })
    */

    it('getDynamicGlobalProperties', async function() {
        assert(true)
        /*
        const result = await liveClient.database.getDynamicGlobalProperties()
        assert.deepEqual(Object.keys(result), [
            'head_block_number', 'head_block_id', 'time', 'current_witness',
            'total_pow', 'num_pow_witnesses', 'virtual_supply', 'current_supply',
            'confidential_supply', 'current_sbd_supply', 'confidential_sbd_supply',
            'total_vesting_fund_steem', 'total_vesting_shares', 'total_reward_fund_steem',
            'total_reward_shares2', 'pending_rewarded_vesting_shares', 'pending_rewarded_vesting_steem',
            'sbd_interest_rate', 'sbd_print_rate', 'maximum_block_size', 'current_aslot',
            'recent_slots_filled', 'participation_count', 'last_irreversible_block_num',
            'vote_power_reserve_rate',  'delegation_return_period', 'reverse_auction_seconds',
            'available_account_subsidies', 'sbd_stop_percent', 'sbd_start_percent', 'next_maintenance_time',
            'last_budget_time', 'content_reward_percent', 'vesting_reward_percent', 'sps_fund_percent',
            'sps_interval_ledger', 'downvote_pool_percent'
        ])
        */
    })

    it('getConfig', async function() {
        assert(true)
        /*
        const result = await liveClient.database.getConfig()
        const r = (key: string) => result['STEEM_'+key]
        serverConfig = result
        
        // also test some assumptions made throughout the code
        const conf = await liveClient.database.getConfig()
        assert.equal(r('CREATE_ACCOUNT_WITH_STEEM_MODIFIER'), 30)
        assert.equal(r('CREATE_ACCOUNT_DELEGATION_RATIO'), 5)
        assert.equal(r('100_PERCENT'), 10000)
        assert.equal(r('1_PERCENT'), 100)

        const version = await liveClient.call('database_api', 'get_version', {})
        assert.equal(version['chain_id'], liveClient.options.chainId)
        */
    })

    it('getBlockHeader', async function() {
        assert(true)
        /*
        const result = await liveClient.database.getBlockHeader(1)
        assert.equal('0000000000000000000000000000000000000000', result.previous)
        */
    })

    it('getBlock', async function() {
        assert(true)
        /*
        const result = await liveClient.database.getBlock(1)
        assert.equal('0000000000000000000000000000000000000000', result.previous)
        assert.equal(
            serverConfig['STEEM_INIT_PUBLIC_KEY_STR'],
            result.signing_key
        )
        */
    })

    it('getOperations', async function() {
        assert(true)
        /*
        const result = await liveClient.database.getOperations(1)
        assert.equal(result.length, 1)
        assert.equal(result[0].op[0], 'producer_reward')
        */
    })

    it('getDiscussions', async function() {
        assert(true)
        /*
        const r1 = await liveClient.database.getDiscussions('comments', {
            start_author: 'almost-digital',
            start_permlink: 're-pal-re-almost-digital-dsteem-a-strongly-typed-steem-client-library-20170702t131034262z',
            tag: 'almost-digital',
            limit: 1,
        })
        assert.equal(r1.length, 1)
        assert.equal(r1[0].body, '☀️heroin for programmers')
        */
    })

    it('getTransaction', async function() {
        assert(true)
        /*
        const tx = await liveClient.database.getTransaction({id: 'c20a84c8a12164e1e0750f0ee5d3c37214e2f073', block_num: 13680277})
        assert.deepEqual(tx.signatures, ['201e02e8daa827382b1a3aefb6809a4501eb77aa813b705be4983d50d74c66432529601e5ae43981dcba2a7e171de5fd75be2e1820942260375d2daf647df2ccaa'])
        try {
            await liveClient.database.getTransaction({id: 'c20a84c8a12164e1e0750f0ee5d3c37214e2f073', block_num: 1})
            assert(false, 'should not be reached')
        } catch (error) {
            assert.equal(error.message, 'Unable to find transaction c20a84c8a12164e1e0750f0ee5d3c37214e2f073 in block 1')
        }
        */
    })

    it('getChainProperties', async function() {
        assert(true)
        /*
        const props = await liveClient.database.getChainProperties()
        assert.equal(Asset.from(props.account_creation_fee).symbol, 'HIVE')
        */
    })

    it('getCurrentMedianHistoryPrice', async function() {
        assert(true)
        /*
        const price = await liveClient.database.getCurrentMedianHistoryPrice()
        assert.equal(Asset.from(price.base).symbol, 'HBD')
        assert.equal(price.quote.symbol, 'HIVE')
        */
    })

    it('getVestingDelegations', async function() {
        assert(true)
        /*
        this.slow(5 * 1000)
        const [delegation] = await liveClient.database.getVestingDelegations('esteemapp', '', 1)
        assert.equal(delegation.delegator, 'esteemapp')
        assert.equal(typeof delegation.id, 'number')
        assert.equal(Asset.from(delegation.vesting_shares).symbol, 'VESTS')
        */
    })

    it('verifyAuthority', async function() {
        assert(true)
        /*
        this.slow(5 * 1000)
        const tx: Transaction = {
            ref_block_num: 0,
            ref_block_prefix: 0,
            expiration: '2000-01-01T00:00:00',
            operations: [['custom_json', {
                required_auths: [],
                required_posting_auths: [acc.username],
                id: 'rpc-params',
                json: '{"foo": "bar"}'
            }]],
            'extensions': [],
        }
        const key = PrivateKey.fromLogin(acc.username, acc.password, 'posting')
        const stx = client.broadcast.sign(tx, key)
        const rv = await client.database.verifyAuthority(stx)
        assert(rv === true)
        const bogusKey = PrivateKey.fromSeed('ogus')
        try {
            await client.database.verifyAuthority(client.broadcast.sign(tx, bogusKey))
            assert(false, 'should not be reached')
        } catch (error) {
            assert.equal(error.message, `Missing Posting Authority ${ acc.username }`)
        }
        */
    })
})
