import {Command, flags} from '@oclif/command'
import RPCProxy from '../../RPC';
import Find from "../../Common/Find";
import {BasicFindOptions} from "attic-common/lib/IRPC";
import * as cliff from "cliff";
import * as _ from 'lodash';
import {OutputFormat} from "../../Common/misc";
import Delete from "../../Common/Delete";

export default class ResolverDelete extends Delete {
  static description = 'conducts a MongoDB delete on the resolvers collection'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    id: flags.string({
      char: 'i',
      required: true
    }),
    mountpoint: flags.string({
      char: 'm',
      required: false
    }),
    priority: flags.integer({
      char: 'u',
      required: false
    }),
    type: flags.string({
      char: 'e',
      required: false
    }),
    skip: flags.integer({
      char: 's',
      required: false
    }),
    limit: flags.integer({
      char: 'l',
      required: false
    }),
    sort: flags.string({
      char: 'o',
      required: false
    }),
    format: flags.enum<OutputFormat>({
      options: [ OutputFormat.text, OutputFormat.json ],
      default: OutputFormat.text
    }),
    verbose: flags.boolean({
      default: false,
      required: false,
      char: 'v'
    })
  }

  async run() {
    const {argv, flags} = this.parse(ResolverDelete);

    let findOptions: BasicFindOptions = this.parseFindOptions(argv, flags);

    if (!_.isEmpty(flags.id)) {
      findOptions.query.id = flags.id;
    }
    if (!_.isEmpty(flags.mountpoint)) {
      findOptions.query['mountPoint.expression'] = flags.mountpoint;
    }
    if (!_.isEmpty(flags.priority) || flags.priority === 0) {
      findOptions.query.priority = flags.priority;
    }
    if (!_.isEmpty(flags.type)) {
      findOptions.query.type = flags.type;
    }

    await RPCProxy.deleteLocations(findOptions);

    process.exit(0);
  }
}
