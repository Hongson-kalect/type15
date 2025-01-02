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
import React, { useState } from "react";

const MyComponent = () => {
  const [language, setLanguage] = useState("");
  const [scope, setScope] = useState("public");
  const [isAssociated, setIsAssociated] = useState(false);
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("VND");
  const [novel, setNovel] = useState("");
  const [protectedType, setProtectedType] = useState<"pass" | "sell">("pass");

  const languages = ["English", "Vietnamese", "Chinese"]; // Example languages
  const novels = ["Novel 1", "Novel 2", "Novel 3"]; // Example novels
  const currencies = ["USD", "VND", "CNY"]; // Example currencies

  return (
    <div className="w-[320px] bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4 flex gap-4 items-center">
        <p className="font-semibold w-32">Language</p>
        <Select value={language} onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <p className="font-semibold w-32">Scope</p>
        <Select value={scope} onValueChange={(e) => setScope(e)}>
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
      {scope === "protected" && (
        <div className="mt-4 shadow-md shadow-gray-600 p-3 ml-4 rounded-lg mb-8">
          <div className="flex gap-3 justify-end items-center">
            <Switch
              checked={protectedType === "pass"}
              onCheckedChange={(e) => setProtectedType(e ? "pass" : "sell")}
            />
            <p className="uppercase font-medium text-sm">{protectedType}</p>
          </div>
          {protectedType === "sell" ? (
            <div className="mt-4 flex items-center gap-2">
              <p className="text-xs font-bold text-gray-600">Price</p>
              <Input
                className="h-8 no-arrow"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Select value={currency} onValueChange={(e) => setCurrency(e)}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr} value={curr}>
                      {curr}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <Select value={novel} onValueChange={(e) => setNovel(e)}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select a novel" />
                </SelectTrigger>
                <SelectContent>
                  {novels.map((nov) => (
                    <SelectItem key={nov} value={nov}>
                      {nov}
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

export default MyComponent;
