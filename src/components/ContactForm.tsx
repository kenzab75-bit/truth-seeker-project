import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, PhoneCall, ShieldCheck } from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(100, { message: "Le nom doit contenir moins de 100 caractères" }),
  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email doit contenir moins de 255 caractères" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Le message est requis" })
    .max(1000, { message: "Le message doit contenir moins de 1000 caractères" }),
  channel: z.enum(["email", "whatsapp", "signal"], {
    required_error: "Choisissez un canal de réponse",
  }),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter le traitement de vos données",
    }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      channel: "email",
      consent: false,
    },
  });

  const contactChannels = {
    email: {
      label: "Email chiffré",
      target: "collectif@lemaclinictruth.fr",
    },
    whatsapp: {
      label: "WhatsApp Business",
      target: "33700000000",
    },
    signal: {
      label: "Signal sécurisé",
      target: "https://signal.me/#p/+33700000000",
    },
  } as const;

  const onSubmit = (data: ContactFormValues) => {
    const payload = encodeURIComponent(
      `Nouveau message du collectif\n\nNom: ${data.name}\nEmail: ${data.email}\nCanal souhaité: ${contactChannels[data.channel].label}\n\n${data.message}`
    );

    if (data.channel === "email") {
      window.location.href = `mailto:${contactChannels.email.target}?subject=Collectif%20LemaClinic%20Truth&body=${payload}`;
    } else if (data.channel === "whatsapp") {
      window.open(`https://wa.me/${contactChannels.whatsapp.target}?text=${payload}`, "_blank");
    } else {
      window.open(contactChannels.signal.target, "_blank");
    }

    toast({
      title: "Message envoyé !",
      description: "Nous avons bien reçu votre message et vous recontacterons rapidement.",
    });

    form.reset({
      name: "",
      email: "",
      message: "",
      channel: "email",
      consent: false,
    });
  };

  const teamMembers = [
    { name: "Sarah", role: "Victimes", eta: "< 12h" },
    { name: "Nadia", role: "Juriste", eta: "24h" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-card rounded-lg border border-border shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Contactez-nous</h2>
        <p className="text-muted-foreground">
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais
        </p>
        <div className="mt-4 text-sm text-muted-foreground flex flex-col items-center gap-1">
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            SLA 24h max, 7/7
          </p>
          <div className="flex gap-4 text-xs uppercase tracking-widest">
            {teamMembers.map(member => (
              <span key={member.name}>{member.name} · {member.role}</span>
            ))}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Nom complet *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Jean Dupont" 
                    {...field}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Adresse email *</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="jean.dupont@example.com" 
                    {...field}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Canal de réponse privilégié</FormLabel>
                <FormControl>
                  <RadioGroup className="grid gap-3 md:grid-cols-3" value={field.value} onValueChange={field.onChange}>
                    <FormItem className="border rounded-xl p-4">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-semibold">Email</FormLabel>
                      <p className="text-xs text-muted-foreground">Chiffrement PGP</p>
                    </FormItem>
                    <FormItem className="border rounded-xl p-4">
                      <FormControl>
                        <RadioGroupItem value="whatsapp" />
                      </FormControl>
                      <FormLabel className="font-semibold">WhatsApp</FormLabel>
                      <p className="text-xs text-muted-foreground">Business vérifié</p>
                    </FormItem>
                    <FormItem className="border rounded-xl p-4">
                      <FormControl>
                        <RadioGroupItem value="signal" />
                      </FormControl>
                      <FormLabel className="font-semibold">Signal</FormLabel>
                      <p className="text-xs text-muted-foreground">Lien privé</p>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Votre message *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez votre situation ou posez votre question..."
                    className="min-h-[150px] resize-none transition-all duration-200 focus:scale-[1.02]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 bg-muted/30">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal text-foreground cursor-pointer">
                    J'accepte que mes données soient traitées conformément à la{" "}
                    <a href="/politique-confidentialite" className="text-primary hover:underline font-semibold">
                      politique de confidentialité
                    </a>
                    {" "}*
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold group"
            disabled={form.formState.isSubmitting}
          >
            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </Button>

          <div className="rounded-xl border border-border p-4 flex items-center gap-3 text-sm text-muted-foreground">
            <PhoneCall className="h-5 w-5 text-primary" />
            <p>Besoin d'une ligne dédiée ? Composez +33 7 00 00 00 00 (heures européennes).</p>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            * Champs obligatoires
          </p>
        </form>
      </Form>
    </div>
  );
}
