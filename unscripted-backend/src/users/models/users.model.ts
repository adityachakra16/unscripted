import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/base/base.model';
import { useMongoosePlugin } from 'src/base/decorators/use-mongoose-decorator';

@useMongoosePlugin()
export class User extends BaseModel {
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  ethAddress: string;
}
