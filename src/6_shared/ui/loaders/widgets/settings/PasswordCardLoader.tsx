import ButtonLoader from "../../components/ButtonLoader";
import DivLoader from "../../components/DivLoader";
import TextLoader from "../../components/TextLoader";

export default function PasswordCardLoader() {
  return (
    <DivLoader
      width="100%"
      height="fit-content"
      rounded="card"
      border
      bg="secondary"
    >
      <div className="flex flex-col gap-5">
        {/*TITLE*/}
        <TextLoader width="12%" bg="foreground" text="h6" className="py-1" />

        {/*DESCRIPTION*/}
        <TextLoader width="75%" bg="foreground" text="h6" />

        <ButtonLoader width="26%" bg="input" border />
      </div>
    </DivLoader>
  );
}
