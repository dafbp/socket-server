
declare global {
    declare module '*.svg' {
        const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
        export default content;
    }
    declare module '*.png' {
        const value: import('react-native').ImageSourcePropType;
        export default value;
    }
    declare module '*.ico' {
        const value: import('react-native').ImageSourcePropType;
        export default value;
    }
    
}
export { };

