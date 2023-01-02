import { todoModule, ToDoRegistry } from '@/todo';
// eslint-disable-next-line @typescript-eslint/ban-types
type AppModulesConfig = {};

const appModules = [todoModule];

type AppModulesRegistry =  ToDoRegistry;


export { appModules };
export type { AppModulesConfig, AppModulesRegistry };
