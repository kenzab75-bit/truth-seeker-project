import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";

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
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter le traitement de vos données",
    }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Encode data for secure transmission via WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Nouveau message de contact:\n\nNom: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
    );
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Open WhatsApp with pre-filled message
    const whatsappNumber = "33123456789"; // Replace with actual number
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
    
    setIsSubmitting(false);
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Message envoyé avec succès !</span>
        </div>
      ) as any,
      description: "Nous avons bien reçu votre message et vous recontacterons rapidement.",
      duration: 5000,
    });
    
    form.reset();
  };

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
                    className="min-h-[48px] transition-all duration-200 focus:scale-[1.02]"
                    aria-label="Entrez votre nom complet"
                    aria-required="true"
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
                    className="min-h-[48px] transition-all duration-200 focus:scale-[1.02]"
                    aria-label="Entrez votre adresse email"
                    aria-required="true"
                  />
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
                    aria-label="Entrez votre message"
                    aria-required="true"
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
            variant="premium"
            size="lg"
            className="w-full group"
            disabled={isSubmitting}
            aria-label="Envoyer le message de contact"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                Envoyer le message
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            * Champs obligatoires
          </p>
        </form>
      </Form>
    </div>
  );
}
