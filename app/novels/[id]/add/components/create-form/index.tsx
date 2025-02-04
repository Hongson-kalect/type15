import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ICurrency, INovel } from "@/interface/schema/schema.interface";
import { AddNovelParagraph } from "@/interface/type/paragraph";
import { getCurrencies } from "@/services/currency.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import defaultBackground from "@/assets/images/default-background.jpg";
import { toast } from "react-toastify";
import { createNovelParagraphService } from "@/services/paragraph.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mainLayoutStore } from "@/store/mainLayout.store";
import { useRouter } from "next/navigation";

export interface ICreateNovelParaFormProps {
  novelId: string;
  novelDetail?: INovel;
}

export default function CreateNovelParaForm({
  novelId,
  novelDetail,
}: ICreateNovelParaFormProps) {
  const { userInfo } = mainLayoutStore();
  const router = useRouter();
  const [lastChapter, setLastChapter] = React.useState<string | number | null>(
    null
  );
  const [chapterInfo, setChapterInfo] = React.useState<AddNovelParagraph>({
    chapter: "",
    image: "",
    title: "",
    content: "",
    desc: "",
    ps: "",
    scope: "public",
    protectedType: "pass",
    password: "",
    price: 0,
    priceUnitId: 1,
    novelId: Number(novelId),
    userId: userInfo?.id,
  });

  const { data: currencies } = useQuery<ICurrency[]>({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const createNovelChapterMuatation = useMutation({
    mutationFn: () => createNovelParagraphService(chapterInfo),
    mutationKey: ["createNovelChapter"],
    onSuccess: () => {
      toast.success("Create paragraph success");
      router.push(`/novels/${novelId}`);
    },
    onError: () => {
      toast.error("Create paragraph failed");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNovelChapterMuatation.mutate();
  };

  React.useEffect(() => {
    if (!novelDetail) return;

    const lastPara = novelDetail?.paragraphs[0];
    if (lastPara) {
      setLastChapter(lastPara?.chapter);
    }

    setChapterInfo((prev) => ({
      ...prev,
      chapter: lastPara?.chapter
        ? (Number(lastPara?.chapter) + 1).toString()
        : "1",
      image: novelDetail?.image || "",
      languageId: Number(novelDetail?.languageId) || 1,
    }));
  }, [novelDetail]);

  React.useEffect(() => {
    setChapterInfo((prev) => ({
      ...prev,
      userId: userInfo?.id,
    }));
  }, [userInfo]);

  return (
    <div className="bg-white px-4 py-3 h-full rounded-xl overflow-auto">
      <Link
        href={`/novels/${chapterInfo.novelId}`}
        className="flex gap-4 items-center text-gray-600 "
      >
        <ArrowLeft />
        <span className="font-medium text-lg">Back</span>
      </Link>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4 px-2">
        <div className="flex gap-4">
          <div className="w-[300px]">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="chapter"
            >
              Chapter
            </label>
            <Input
              id="chapter"
              value={chapterInfo.chapter}
              onChange={(e) =>
                setChapterInfo({ ...chapterInfo, chapter: e.target.value })
              }
            />
            {lastChapter ? (
              <p className="text-red-500 text-xs">
                last chapter: {lastChapter}
              </p>
            ) : null}
          </div>

          <div className="flex-1 flex flex-col">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="chapter"
            >
              Thumbnail
            </label>
            <Input
              id="chapter"
              value={chapterInfo.image}
              onChange={(e) =>
                setChapterInfo({ ...chapterInfo, image: e.target.value })
              }
            />
            <div className="h-32 w-48 mt-2 flex items-center relative justify-center overflow-hidden">
              <Image
                src={chapterInfo.image || defaultBackground}
                alt="Book Image"
                className="object-cover"
                // width={168}
                // height={168}
                fill
                // objectFit="cover"
              />
            </div>
          </div>

          <div
            className="px-4 bg-gray-100 pt-2 rounded-lg shadow shadow-gray-800 w-[300px]"
            // style={{ border: "1px solid black" }}
          >
            <div className="mb-4 flex gap-4 items-center">
              <p className="font-semibold w-32">Scope</p>
              <Select
                value={chapterInfo.scope}
                onValueChange={(e) =>
                  setChapterInfo((prev) => ({ ...prev, scope: e }))
                }
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
            {chapterInfo.scope === "protected" && (
              <div className="mt-4 shadow-md shadow-gray-600 p-3 ml-4 rounded-lg mb-8">
                <div className="flex gap-3 justify-end items-center">
                  <Switch
                    className=""
                    checked={chapterInfo.protectedType === "pass"}
                    onCheckedChange={(e) =>
                      setChapterInfo((prev) => ({
                        ...prev,
                        protectedType: e ? "pass" : "sell",
                      }))
                    }
                  />
                  <p className="uppercase font-medium text-sm w-12">
                    {chapterInfo.protectedType}
                  </p>
                </div>
                {chapterInfo.protectedType === "sell" ? (
                  <div className="mt-4 flex items-center gap-2">
                    <p className="text-xs font-bold text-gray-600">Price</p>
                    <Input
                      className="h-8 no-arrow"
                      type="number"
                      value={chapterInfo.price}
                      onChange={(e) =>
                        setChapterInfo((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                    />
                    <Select
                      value={chapterInfo.priceUnitId?.toString() || ""}
                      onValueChange={(e) =>
                        setChapterInfo((prev) => ({
                          ...prev,
                          priceUnitId: Number(e),
                        }))
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies?.length &&
                          currencies.map((curr) => (
                            <SelectItem
                              key={curr.id}
                              value={curr.id.toString()}
                            >
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
                      value={chapterInfo.password}
                      onChange={(e) =>
                        setChapterInfo((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <Input
            id="title"
            value={chapterInfo.title}
            onChange={(e) =>
              setChapterInfo({ ...chapterInfo, title: e.target.value })
            }
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="content"
          >
            Content
          </label>
          <Textarea
            id="content"
            rows={5}
            value={chapterInfo.content}
            onChange={(e) =>
              setChapterInfo({ ...chapterInfo, content: e.target.value })
            }
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="desc"
          >
            Description
          </label>
          <Textarea
            id="desc"
            value={chapterInfo.desc}
            onChange={(e) =>
              setChapterInfo({ ...chapterInfo, desc: e.target.value })
            }
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="ps"
          >
            P/S
          </label>
          <Input
            id="ps"
            value={chapterInfo.ps}
            onChange={(e) =>
              setChapterInfo({ ...chapterInfo, ps: e.target.value })
            }
          />
        </div>
      </form>
      <Button type="submit" onClick={handleSubmit} className="w-full mt-4">
        Create Paragraph
      </Button>
    </div>
  );
}
