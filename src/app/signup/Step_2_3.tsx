import { useState } from "react";
import Image from "next/image";
import { Heading1 } from "@/styles/texts";

export default function Step_2_3() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <Image
        src="/images/vb_step_2.svg"
        alt="signup step2"
        width={368}
        height={48}
        style={{ margin: "48px 0 48px 0" }}
      />
      <Heading1 style={{ margin: "16px 0 40px 0" }}>
        Choose your coverage level.
      </Heading1>
      <Image
        src="/images/vb_coverage_standard_inactive.png"
        alt={"standard"}
        width={720}
        height={176}
        style={{ marginBottom: "16px" }}
      />
      {isClicked ? (
        <Image
          src="/images/vb_coverage_premium_active.png"
          alt={"premium"}
          width={720}
          height={224}
          style={{ marginBottom: "16px", cursor: "pointer" }}
          onClick={() => setIsClicked(false)}
        />
      ) : (
        <Image
          src="/images/vb_coverage_premium_inactive.png"
          alt={"premium"}
          width={720}
          height={224}
          style={{ marginBottom: "16px", cursor: "pointer" }}
          onClick={() => setIsClicked(true)}
        />
      )}

      <Image
        src="/images/vb_coverage_fullcover_inactive.png"
        alt={"full cover"}
        width={720}
        height={248}
        style={{ marginBottom: "40px" }}
      />
    </>
  );
}
