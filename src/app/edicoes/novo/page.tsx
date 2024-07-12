"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn, slugify } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createEdition } from "./action";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Edition } from "@/lib/api";

export const FormSchema = z.object({
  organization: z.string({
    required_error: "Escolha a organização",
  }),
  date: z.date({
    required_error: "Escolha uma data",
  }),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const edition: Partial<Edition> = {
      date: format(data.date, "yyyy-MM-dd"),
      organization: data.organization,
    };

    createEdition(edition);

    const organizationSlug = slugify(edition.organization!);

    toast.success("Edição cadastrada", {
      action: {
        label: "Ver edição",
        onClick: () => {
          router.push(`/edicoes/${organizationSlug}/${edition.date}`);
        },
      },
    });
  };

  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/edicoes">Edições</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cadastrar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-semibold">Nova Edição</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8"
        >
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Organização</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-min justify-between flex items-center gap-x-2 font-normal",
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
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-min flex justify-between items-center gap-x-2 font-normal",
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
          <Button type="submit" className="w-full md:w-min">
            Cadastrar
          </Button>
        </form>
      </Form>
    </main>
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
