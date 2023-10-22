import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { AutoLogin } from "./index"

export default {
  title: "UI/AutoLogin",
  component: AutoLogin,
} as ComponentMeta<typeof AutoLogin>;

const Template: ComponentStory<typeof AutoLogin> = (args) => (
  <AutoLogin {...args} />
)

export const Default = Template.bind({})
Default.args = {}