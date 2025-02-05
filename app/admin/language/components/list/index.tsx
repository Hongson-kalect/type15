"use client";

import { Button } from "@/components/ui/button";
import { ILanguage } from "@/interface/schema/schema.interface";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

export interface ILanguageListProps {
  languages: ILanguage[] | undefined;
  setLanguage: (item: ILanguage) => void;
  selectedLanguage: ILanguage | undefined;
  setSelectedLanguage: (item: ILanguage) => void;
}

export default function LanguageList({
  languages,
  setLanguage,
  selectedLanguage,
  setSelectedLanguage,
}: ILanguageListProps) {
  const { mutation: createLanguage } = useMutation;

  const handleAddLanguageClicked = () => {
    setLanguage({
      name: "",
      code: "",
      desc: "",
      flag: "",
    });
    setSelectedLanguage(undefined);
  };

  const handleSelectLanguage = (item: ILanguage) => {
    setLanguage(item);
  };

  return (
    <div className="flex-1 bg-white rounded-2xl p-4 overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium ">Danh sách ngôn ngữ</h2>
        <Button
          onClick={handleAddLanguageClicked}
          className="bg-green-600 hover:bg-green-800"
        >
          <FaPlus />
          <p>Tạo ngôn ngữ</p>
        </Button>
      </div>
      <div className="w-full">
        <table className="mt-6 min-w-[700px] w-full text-center">
          <tbody>
            <tr className="text-gray-700 [&_th]:py-3 bg-gray-200">
              <th>Index</th>
              <th>Language name</th>
              <th>Code</th>
              <th>Flag</th>
              <th>Desc</th>

              {/* <th>total</th> */}
            </tr>

            {!languages?.length
              ? null
              : languages?.map((item, index) => (
                  <tr
                    className={`hover:bg-blue-100 duration-300 cursor-pointer ${
                      selectedLanguage?.id === item.id
                        ? "!bg-blue-500 text-white"
                        : ""
                    }`}
                    key={item.code}
                    onClick={() => handleSelectLanguage(item)}
                  >
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td className="h-10">
                      <div className="items-center justify-center flex h-full">
                        {item.flag ? (
                          <Image
                            src={item.flag}
                            alt={item.name}
                            width={32}
                            height={24}
                          />
                        ) : (
                          <div className="text-xs w-8 h-6 bg-gray-300 rounded-lg flex items-center justify-center">
                            img
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{item.name}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!languages?.length && (
          <div className="w-full flex items-center justify-center">
            <p>No item found</p>
          </div>
        )}
      </div>
    </div>
  );
}
