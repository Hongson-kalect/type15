"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ICurrency,
  ILanguage,
  INovel,
} from "@/interface/schema/schema.interface";
import { AddParagraphOption } from "@/interface/type/paragraph";
import { getCurrencies } from "@/services/currency.service";
import { getLanguages } from "@/services/mainLayout.service";
import { getNovels } from "@/services/novel.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type AddParaOptionProps = {
  // languages:ILanguage[],
  options: AddParagraphOption;
  setOptions: React.Dispatch<React.SetStateAction<AddParagraphOption>>;
};

const AddParaOption = ({ options, setOptions }: AddParaOptionProps) => {
  const [language, setLanguage] = useState("");
  const [scope, setScope] = useState("public");
  const [isAssociated, setIsAssociated] = useState(false);
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("VND");
  const [novel, setNovel] = useState("");

  const { data: languages } = useQuery<ILanguage[]>({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
  const { data: currencies } = useQuery<ICurrency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });
  const { data: novels } = useQuery<INovel[]>({
    queryKey: ["novels"],
    queryFn: getNovels,
  });

  return (
    <div className="w-[320px] bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4 flex gap-4 items-center">
        <p className="font-semibold w-32">Language</p>
        <Select
          value={options.languageId.toString()}
          onValueChange={(value) =>
            setOptions((prev) => ({ ...prev, languageId: Number(value) }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages?.length &&
              languages.map((lang) => (
                <SelectItem key={lang.id} value={lang?.id?.toString() || ""}>
                  {lang.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <p className="font-semibold w-32">Scope</p>
        <Select
          value={options.scope}
          onValueChange={(e) => setOptions((prev) => ({ ...prev, scope: e }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="protected">Protected</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {options.scope === "protected" && (
        <div className="mt-4 shadow-md shadow-gray-600 p-3 ml-4 rounded-lg mb-8">
          <div className="flex gap-3 justify-end items-center">
            <Switch
              checked={options.protectedType === "pass"}
              onCheckedChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  protectedType: e ? "pass" : "sell",
                }))
              }
            />
            <p className="uppercase font-medium text-sm">
              {options.protectedType}
            </p>
          </div>
          {options.protectedType === "sell" ? (
            <div className="mt-4 flex items-center gap-2">
              <p className="text-xs font-bold text-gray-600">Price</p>
              <Input
                className="h-8 no-arrow"
                type="number"
                value={options.price}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
              <Select
                value={currency}
                onValueChange={(e) =>
                  setOptions((prev) => ({ ...prev, currency: Number(e) }))
                }
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies?.length &&
                    currencies.map((curr) => (
                      <SelectItem key={curr.id} value={curr.id.toString()}>
                        {curr.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2">
              <p className="text-xs font-bold text-gray-600">Password</p>
              <Input
                type="password"
                className="h-8"
                value={options.password}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>
          )}
        </div>
      )}
      <div>
        <div className="mb-4 flex gap-4 items-center justify-between">
          <p className="font-semibold">Association</p>
          <Switch
            checked={isAssociated}
            onCheckedChange={(e) => setIsAssociated(e)}
          />
        </div>
        {isAssociated && (
          <div className="mt-4 shadow-md shadow-gray-600 p-3 ml-4 rounded-lg mb-8">
            <div className="flex gap-2 items-center mb-2">
              <p className="text-xs font-bold text-gray-600 text-nowrap">
                Select Novel
              </p>
              <Select
                value={options.novelId?.toString()}
                onValueChange={(e) =>
                  setOptions((prev) => ({ ...prev, novelId: Number(e) }))
                }
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select a novel" />
                </SelectTrigger>
                <SelectContent>
                  {novels?.length &&
                    novels.map((nov) => (
                      <SelectItem key={nov.id} value={nov.id.toString()}>
                        <div className="line-clamp-2">{nov.name}</div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm font-medium text-gray-800 text-nowrap">
              Chapter
            </p>
            <Input required />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddParaOption;
