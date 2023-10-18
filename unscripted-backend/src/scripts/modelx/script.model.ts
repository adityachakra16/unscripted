import { prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/base/base.model';
import { useMongoosePlugin } from 'src/base/decorators/use-mongoose-decorator';

export class Character {
  id: string;

  name: string;

  description: string;
}

export class Dialog {
  id: string;

  content: string;

  characterId: string;
}

@useMongoosePlugin()
export class Script extends BaseModel {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  dialogs: {
    [key: string]: Dialog;
  };

  @prop({ required: true })
  characters: {
    [key: string]: Character;
  };

  @prop({ required: true })
  writer: string;
}
