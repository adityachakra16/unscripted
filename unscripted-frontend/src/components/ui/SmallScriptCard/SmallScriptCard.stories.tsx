import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { SmallScriptCard } from "./index"

export default {
  title: "UI/SmallScriptCard",
  component: SmallScriptCard,
} as ComponentMeta<typeof SmallScriptCard>;

const Template: ComponentStory<typeof SmallScriptCard> = (args) => (
  <SmallScriptCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}