'use client';

import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ToolPageLayout from '@/components/ToolPageLayout';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { ArrowLeftRight, FileJson } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useState } from 'react';
import { yamlToJson, jsonToYaml } from '../yaml-json/convertYamlJson';
import { csvToJson, jsonToCsv } from '../csv-json/convertCsvJson';
import { tomlToJson, jsonToToml } from '../toml-json/convertTomlJson';
import { xmlToJson, jsonToXml } from '../xml-json/convertXmlJson';

interface FormatConfig {
  id: string;
  label: string;
  toJson: (input: string) => string;
  fromJson: (input: string) => string;
  placeholder: string;
}

const formats: FormatConfig[] = [
  { id: 'yaml', label: 'YAML', toJson: yamlToJson, fromJson: jsonToYaml, placeholder: 'YAMLを入力...' },
  { id: 'csv', label: 'CSV', toJson: csvToJson, fromJson: jsonToCsv, placeholder: 'CSVを入力...' },
  { id: 'toml', label: 'TOML', toJson: tomlToJson, fromJson: jsonToToml, placeholder: 'TOMLを入力...' },
  { id: 'xml', label: 'XML', toJson: xmlToJson, fromJson: jsonToXml, placeholder: 'XMLを入力...' },
];

const ConverterPanel = ({ format }: { format: FormatConfig }) => {
  const [toJson, setToJson] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { copiedKey, copy } = useCopyToClipboard();

  const handleConvert = useCallback(() => {
    setError('');
    try {
      setOutput(toJson ? format.toJson(input) : format.fromJson(input));
    } catch {
      setError('変換に失敗しました。入力値を確認してください。');
      setOutput('');
    }
  }, [toJson, format, input]);

  const toggleMode = useCallback(() => {
    setToJson((prev) => !prev);
    setInput(output);
    setOutput('');
    setError('');
  }, [output]);

  const inputLabel = toJson ? format.label : 'JSON';
  const outputLabel = toJson ? 'JSON' : format.label;
  const placeholder = toJson ? format.placeholder : 'JSONを入力...';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={toJson ? 'default' : 'outline'}
          onClick={() => { setToJson(true); setError(''); }}
        >
          {format.label} → JSON
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          aria-label="入出力を入れ替える"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        <Button
          variant={!toJson ? 'default' : 'outline'}
          onClick={() => { setToJson(false); setError(''); }}
        >
          JSON → {format.label}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={toJson ? 'to' : 'from'}
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-2">
            <label htmlFor={`${format.id}-input`} className="text-sm font-medium">
              {inputLabel}
            </label>
            <Textarea
              id={`${format.id}-input`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows={5}
              className="font-mono"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="button" className="w-full" onClick={handleConvert}>
              変換
            </Button>
          </motion.div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <AnimatePresence>
            {output && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <label htmlFor={`${format.id}-output`} className="text-sm font-medium">
                    {outputLabel}
                  </label>
                  <CopyButton copied={copiedKey !== null} onClick={() => copy(output)} />
                </div>
                <Textarea
                  id={`${format.id}-output`}
                  value={output}
                  readOnly
                  rows={5}
                  className="font-mono"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const JsonConvertPage = () => (
  <ToolPageLayout icon={FileJson} title="JSON 変換">
    <Tabs defaultValue="yaml">
      <TabsList className="w-full">
        {formats.map((f) => (
          <TabsTrigger key={f.id} value={f.id} className="flex-1">
            {f.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {formats.map((f) => (
        <TabsContent key={f.id} value={f.id}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ConverterPanel format={f} />
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  </ToolPageLayout>
);

export default JsonConvertPage;
