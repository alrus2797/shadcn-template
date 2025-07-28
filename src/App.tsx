import { useCallback, useRef, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Badge } from "./components/ui/badge";
import AvatarEditor from "react-avatar-editor";
import { Input } from "./components/ui/input";
import Dropzone, { useDropzone } from "react-dropzone";
import { Button } from "./components/ui/button";

type StringKeyOf<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface DropdownFieldProps<T> {
  values: T[];
  idKey: StringKeyOf<T>;
  labelKey: StringKeyOf<T>;
}
const DropdownItem = <T,>({
  values,
  idKey,
  labelKey,
}: DropdownFieldProps<T>) => {
  return (
    <>
      {values.map((value, idx) => (
        <li key={idx}>
          <span>{value[idKey]}</span>
          <span>{value[labelKey]}</span>
        </li>
      ))}
    </>
  );
};

function App() {
  const items = [1, 2, 3];
  const [img, setImg] = useState<File | null>(null);

  const [resultImg, setResultImg] = useState<string | null>(null);
  const editor = useRef<AvatarEditor>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log("asdasdsa", acceptedFiles);
    setImg(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      <div className="flex-1">
        <div className="flex min-h-screen flex-col px-8 pb-8">
          <span className="text-2xl font-bold">Initial Steps</span>
          <div className="flex gap-2 border-1 border-red-400 w-full overflow-x-auto">
            <div className="flex gap-2 min-w-max py-4">
              {items.map(() => (
                <div className="flex items-center gap-1 border-1 border-black p-2 rounded-lg min-w-[200px]">
                  <span>Holasdjkashdskajdsa</span>
                  <Badge>sajhdsajd</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-30">
            {img === null ? (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center w-60 h-60 "
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center  ">
                <AvatarEditor
                  ref={editor}
                  image={img}
                  borderRadius={100}
                  backgroundColor="transparent"
                  showGrid
                  className="w-60 h-60"
                />
                <div className="flex gap-4 mt-2">
                  <Button
                    onClick={() => {
                      setImg(null);
                      setResultImg(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      if (editor && editor.current) {
                        const dataUrl = editor.current.getImage().toDataURL();
                        const res = await fetch(dataUrl);
                        const blob = await res.blob();

                        const url = window.URL.createObjectURL(blob);
                        setResultImg(url);
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
            {resultImg && <img className="mt-4" src={resultImg} />}
          </div>

          {/* <DropdownItem /> */}
        </div>
      </div>
    </Layout>
  );
}

export default App;
