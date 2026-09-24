import { createContext, useState, useCallback, useMemo } from "react";
import { fetchProjectSchema } from "../services/commonServices";

export const ProjectSchemaContext = createContext();

const ProjectSchemaProvider = ({ children }) => {
  const [schema, setSchema] = useState(null);

  // useCallback ensures the function reference is stable
  const fetchVehicleFieldSchema = useCallback(async () => {
    try {
      const storedSchema = sessionStorage.getItem("schema");
      if (storedSchema) {
        setSchema(JSON.parse(storedSchema));
        return;
      }

      const formSchema = await fetchProjectSchema();
      if (formSchema?.status) {
        setSchema(formSchema);
        sessionStorage.setItem("schema", JSON.stringify(formSchema));
      }
    } catch (error) {
      console.error("Failed to fetch project schema:", error);
    }
  }, []);

  // useMemo ensures context value reference is stable
  const contextValue = useMemo(
    () => ({
      schema,
      fetchVehicleFieldSchema,
    }),
    [schema, fetchVehicleFieldSchema]
  );

  return (
    <ProjectSchemaContext.Provider value={contextValue}>
      {children}
    </ProjectSchemaContext.Provider>
  );
};

export default ProjectSchemaProvider;
