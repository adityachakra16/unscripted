import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { ScriptCard } from "./index"

export default {
  title: "UI/ScriptCard",
  component: ScriptCard,
} as ComponentMeta<typeof ScriptCard>;

const Template: ComponentStory<typeof ScriptCard> = (args) => (
  <ScriptCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}