"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Edition } from "@/lib/api";
import { cn, stringToDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckIcon, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { updateEdition } from "./action";

const FormSchema = z.object({
  organization: z.string({
    required_error: "Escolha a organização",
  }),
  date: z.date({
    required_error: "Escolha uma data",
  }),
  title: z.string().optional(),
  mode: z.string().optional(),
  editionNumber: z.string().optional(),
  judges: z.string().optional(),
  instagramPost: z.string().optional(),
});

export function EditEditionForm({ edition }: { edition: Edition }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...edition,
      date: stringToDate(edition.date),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log({ data });

    const edition: Partial<Edition> = {
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
      organization: data.organization,
    };

    updateEdition(edition as Edition);
  };

  return (
    <div className="flex flex-col md:grid md:grid-flow-row md:grid-cols-2 gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8"
        >
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem className="flex flex-col w-min">
                <FormLabel>Organização</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between flex items-center gap-x-2 font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {field.value
                            ? ORGANIZATIONS.find(
                                (organization) => organization === field.value
                              )
                            : "Escolha a organização"}
                        </span>
                        <CaretSortIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-64 text-nowrap p-0"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Buscar organização..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Organização não encontrada.</CommandEmpty>
                        <CommandGroup>
                          {ORGANIZATIONS.map((organization) => (
                            <CommandItem
                              value={organization}
                              key={organization}
                              onSelect={() => {
                                form.setValue("organization", organization);
                              }}
                            >
                              {organization}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  organization === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-min">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex justify-between items-center gap-x-2 font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {field.value
                            ? format(field.value, "PPP", { locale: ptBR })
                            : "Escolha uma data"}
                        </span>
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={ptBR}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("2024-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Edição Clandestina Especial 2 Anos"
                  />
                </FormControl>
                <FormDescription>
                  Título opicional que ajude a identificar a edição.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bate e Volta, Desafio" />
                </FormControl>
                <FormDescription>
                  Lista de modalidades presentes na edição.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="editionNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número da edição</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="10"
                    className="w-14"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="judges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jurados</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Medusa e Baueb" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramPost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post do campeão</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="https://www.instagram.com/p/..."
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-min">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
}

const ORGANIZATIONS = [
  "Batalha da Casa Coletiva",
  "Batalha da DC (Tefé)",
  "Batalha da Diversidade",
  "Batalha da God",
  "Batalha da Malta",
  "Batalha da Maltinha",
  "Batalha da Matinha",
  "Batalha da New City",
  "Batalha da Norte",
  "Batalha da Onça",
  "Batalha da Praia",
  "Batalha da UDV",
  "Batalha da União",
  "Batalha da Zaik (Tefé)",
  "Batalha do BK",
  "Batalha do Brooklyn",
  "Batalha do Conekta",
  "Batalha do Esquenta",
  "Batalha do Lado Leste",
  "Batalha do Leme",
  "Batalha do Mirante (Ita)",
  "Batalha do Mundo Novo",
  "Batalha do Passarinho",
  "Batalha do Santa (Tefé)",
  "Batalha do Vale",
  "Batalha do Vila",
  "Batalha do VM2",
  "Batalha dos Barés",
  "Batalha dos Caixa Baixa",
  "Flow de Favela",
  "Hip Hop Delas",
  "La Prata Prod",
  "Movimento BDM (Tefé)",
  "Raízes Espaço Cultural",
  "Ringue Clandestino",
  "Trap na Veia",
];
