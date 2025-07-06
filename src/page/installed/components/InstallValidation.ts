import { z } from "zod";

const SimCardSchema = z.object({
  operator: z.string().min(1, { message: "Operator is required" }).optional(),
  phone_no: z.string().min(1, { message: "Phone number is required" }),
});
export const OperatorSchema = z.object({
  operators: z.array(SimCardSchema),
});

export const AccessorySchema = z.object({
  accessory: z
    .array(
      z.object({
        type_id: z.string().min(1, { message: "Accessory Type is required" }),
        qty: z.string().min(1, { message: "Quantity is required" }),
      })
    )
    .min(1, { message: "At least one accessory is required" }),
});

export const ServerSchema = z.object({
  type_id: z.string().min(1, { message: "Server Type is required" }),
  domain: z
    .array(z.string().min(1, { message: "Domain is required" }))
    .min(1, { message: "At least one domain is required" }),
  installed_date: z.date(),
  subscription_plan_id: z
    .string()
    .min(1, { message: "Subscription Plan is required" }),
  expire_date: z.date(),
  invoice_no: z.string().min(1, { message: "Invoice No. is required" }),
  object_base_fee: z
    .string()
    .min(1, { message: "Object Base Fee is required" }),
});

export const InstallationEngineerSchema = z
  .array(
    z.object({
      user_id: z.string().min(1, { message: "Engineer is required" }),
    })
  )
  .min(1, { message: "At least an engineer is required" });

export const VehicleSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  vehicleType: z.string().nullable().optional(),
  vehicleBrand: z.string().nullable().optional(),
  vehicleModel: z.string().nullable().optional(),
  vehicleYear: z.coerce
    .number({ message: "Please enter number" })
    .nullable()
    .optional(),
  vehiclePlateNo: z.string().min(1, { message: "Plate No. is required" }),
  vehicleOdometer: z.string().nullable().optional(),
});

export const GpsSchema = z.object({
  gpsBrand: z.string().min(1, { message: "GPS brand is required" }),
  gpsModel: z.string().min(1, { message: "GPS model is required" }),
  imei: z.string().min(1, { message: "IMEI is required" }),
  gpsSerial: z.string().min(1, { message: "GPS Serial is required" }),
  warranty: z.string().min(1, { message: "Warranty is required" }),
});

const PeripheralDetailSchema = z.object({
  brand_id: z.string().optional(),
  model_id: z.string().optional(),
  serial_no: z.string().optional(),
  warranty_plan_id: z.string().optional(),
});

export const PeripheralSchema = z.object({
  peripheral: z
    .array(
      z.object({
        sensor_type_id: z.string().optional(),
        qty: z.string().optional(),
        detail: z.array(PeripheralDetailSchema).optional(),
      })
    )
    .optional(),
});

export const renewalformSchema = z.object({
  id: z.any(), // or z.string() / z.number() depending on your actual type
  renewalDate: z.date(),
  expireDate: z.date({ message: "Expire data is required" }),
  subscriptionPlan: z.string().nonempty("Subscription plan is required"),
  type: z.string().nonempty("Type is required"),
  domain: z
    .array(z.string().min(1, { message: "Domain is required" }))
    .min(1, { message: "At least one domain is required" }),
  invoiceNo: z.string().nonempty("Invoice number is required"),
});
