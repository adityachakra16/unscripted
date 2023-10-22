import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { Onramp } from "./index"

export default {
  title: "UI/Onramp",
  component: Onramp,
} as ComponentMeta<typeof Onramp>;

const Template: ComponentStory<typeof Onramp> = (args) => (
  <Onramp {...args} />
)

export const Default = Template.bind({})
Default.args = {}