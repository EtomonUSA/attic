import {Command, flags} from '@oclif/command'
import RPCProxy from '../../RPC';
import Find from "../../Common/Find";
import {BasicFindOptions} from "attic-common/lib/IRPC";
import * as cliff from "cliff";
import * as _ from 'lodash';
import {formatOutputFromFlags, OutputFormat} from "../../Common/misc";
import Create from "../../Common/Create";
import {IEntity, ILocation} from "attic-common/lib";
import * as URL from 'url';

export default class EntityCreate extends Create {
  static description = 'creates a entity returning a entity id'
  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    source: flags.string({
      char: 's',
      required: true
    }),
    type: flags.string({
      char: 't',
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

  static args = [
    {
      name: 'fields'
    }
  ]

  async run() {
    const {argv, flags} = this.parse(EntityCreate);

    let entity: IEntity = !_.isEmpty(argv[0]) ? JSON.parse(argv[0]) : {};

    let url = URL.parse(flags.source);
    let source = entity.source = {
      href: URL.format(url)
    };

    if (!_.isEmpty(flags.type) && flags.type) {
      entity.type = flags.type;
    }

    let output: string;
    let entityId = await RPCProxy.createEntity(entity);

    let outObject = { id: entityId, source };


    console.log(formatOutputFromFlags(outObject, flags, [ 'id', 'source.href' ]));
  }
}
