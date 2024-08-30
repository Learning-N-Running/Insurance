import TextInput from "@/components/base/TextInput";
import ToggleSwitch from "@/components/base/ToggleSwitch";
import { Heading1 } from "@/styles/texts";
import Image from "next/image";

export default function Step_1_1() {
  return (
    <>
      <Image
        src="/images/vb_step_1.svg"
        alt="signup step1"
        width={720}
        height={48}
        style={{ margin: "48px 0 48px 0" }}
      />
      <Heading1 style={{ marginTop: "16px" }}>
        {"Let's get started with your details!"}
        <br />
        Fill in your information.
      </Heading1>
      <TextInput
        label={"Name"}
        margin={"40px 0 0 0"}
        placeholder="Enter your Name as on passport."
      />
      <ToggleSwitch
        label={"Gender"}
        margin={"40px 0 0 0"}
        option1={"Male"}
        option2={"Female"}
      />
      <TextInput
        label={"Residence / Passport Number"}
        margin={"40px 0 72px 0"}
        placeholder="Enter your Passport or Residence Number"
      />
    </>
  );
}
