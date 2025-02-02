"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ICurrency, ILanguage } from "@/interface/schema/schema.interface";
import { EditNovelOption } from "@/interface/type/novel";
import { getCurrencies } from "@/services/currency.service";
import { getLanguages } from "@/services/mainLayout.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type EditNovOptionProps = {
  // languages:ILanguage[],
  options: EditNovelOption;
  setOptions: React.Dispatch<React.SetStateAction<EditNovelOption>>;
};

const EditNovOption = ({ options, setOptions }: EditNovOptionProps) => {
  const [currency, setCurrency] = useState("VND");

  const { data: languages } = useQuery<ILanguage[]>({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });
  const { data: currencies } = useQuery<ICurrency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  console.log("options", options);

  return (
    <div className="w-[320px] bg-white p-4 rounded-lg shadow-md">
      <div>Chưa làm chi tiết về sửa, vì có phần password, xác thực các thứ</div>
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
    </div>
  );
};

export default EditNovOption;
