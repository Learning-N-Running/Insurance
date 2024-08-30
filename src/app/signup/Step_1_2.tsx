import TextInput from "@/components/base/TextInput";
import ToggleSwitch from "@/components/base/ToggleSwitch";
import { Heading1 } from "@/styles/texts";
import Image from "next/image";

export default function Step_1_2({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Image
        src="/images/vb_step_1.svg"
        alt="signup step1"
        width={720}
        height={48}
        style={{ margin: "48px 0 48px 0" }}
      />
      <Heading1 style={{ margin: "16px 0 82px 0" }}>
        Please register
        <br />
        {"your International driver's license."}
      </Heading1>
      <Image
        src="/images/vb_register_passport.svg"
        alt="passport"
        width={721}
        height={411}
        onClick={() => onClick()}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}
