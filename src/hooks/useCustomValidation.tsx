import { z } from '../validation';

export type ZodDependencyDef<T> = {
  dependentField: keyof T;
  baseField: keyof T;
  condition: (data: T) => boolean;
  expectedValue: string;
};

function generateRefineMessage<T>(dependentField: keyof T, baseField: keyof T, expectedValue: string): string {
  return `Câmpul '${String(dependentField)}' trebuie să fie ${expectedValue} față de câmpul: ${String(baseField)}.`;
}

type CustomValidationType<T> = {
  fieldConfigs: Record<string, z.ZodTypeAny>;
  dependencies: ZodDependencyDef<T>[];
};

export function useCustomValidation<T>({ fieldConfigs, dependencies }: CustomValidationType<T>) {
  const validationSchema = z.object(fieldConfigs).superRefine((data, ctx) => {
    for (const dep of dependencies) {
      if (!dep.condition(data as T)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [dep.dependentField as string],
          message: generateRefineMessage(dep.dependentField, dep.baseField, dep.expectedValue),
        });
      }
    }
  });

  return { validationSchema };
}
