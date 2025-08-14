import ButtonLoader from "../../components/ButtonLoader";
import DivLoader from "../../components/DivLoader";
import TextLoader from "../../components/TextLoader";

export default function PersonalDetailsCardLoader() {
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
        <TextLoader width="18%" bg="foreground" text="h6" className="py-1" />

        {/*INPUTS*/}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 py-2">
            <TextLoader width="8%" bg="foreground" text="h6" />
            <TextLoader width="22%" bg="foreground" text="h6" />
          </div>

          <div className="flex gap-4 py-2">
            <TextLoader width="18%" bg="foreground" text="h6" />
            <TextLoader width="12%" bg="foreground" text="h6" />
          </div>
        </div>

        <ButtonLoader width="8%" bg="input" border />
      </div>
    </DivLoader>
  );
}
