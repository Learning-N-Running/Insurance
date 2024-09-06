import { AdminMsg } from "./Container";

export const ETHSIGN_COMMAND = "/sign";
export const ETHSignView = (props: { isSigned: boolean }) => {
  return (
    <AdminMsg>
      <p>
        Great! We just need your signature to confirm that all details are
        accurate. Please sign below to confirm and submit your claim.
      </p>
      <br />
      <p>Open the link and input the password to sign the contract.</p>
      <br />
      <p>Contract Password: 0987</p>

      <button
        onClick={() => {
          window.open(
            "https://app.ethsign.xyz/contract/ES-V-lq24fz78Mft5Hq_g6ayzf",
            "_blank"
          );
        }}
        disabled={props.isSigned}
        className="bg-primary disabled:bg-neutral-100 text-white disabled:text-neutral-500 rounded-xl py-3 text-lg mt-4 w-full flex items-center justify-center"
      >
        {props.isSigned ? "Contract Signed" : "Sign Contract"}
      </button>
    </AdminMsg>
  );
};
