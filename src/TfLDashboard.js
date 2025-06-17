.grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Lightbulb className="h-6 w-6 mr-3 text-blue-600" />
              Process Improvement Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Monitoring Strategy</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Monitor reset patterns (frequency and duration)</li>
                  <li>• Track service durations continuously</li>
                  <li>• Consider environmental conditions impact</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Preventive Maintenance</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• HostType_2 devices need more frequent checks</li>
                  <li>• Systems with reset patterns need intervention</li>
                  <li>• Focus on entry-point components</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-2">Data Quality</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Improve categorization of reset reasons</li>
                  <li>• NULL values in ReasonForReset are predictive</li>
                  <li>• Enhance diagnostic data collection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-3 text-blue-600" />
              Key Findings Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Temporal metrics dominate</p>
                  <p className="text-sm text-slate-600">ResetsSinceEOD and ResetDuration are top predictors</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Activation errors critical</p>
                  <p className="text-sm text-slate-600">More predictive than invalid transactions</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Entry points matter most</p>
                  <p className="text-sm text-slate-600">Entry metrics outweigh exit metrics in prediction</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Environmental impact confirmed</p>
                  <p className="text-sm text-slate-600">Temperature extremes correlate with failures</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">EMV system sensitivity</p>
                  <p className="text-sm text-slate-600">EMV processing shows higher failure correlation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

// Main Dashboard Component
function TfLDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    setActiveTab(tabId);
    
    setTimeout(() => setIsLoading(false), 300);
  }, [activeTab]);

  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const renderTabContent = useCallback(() => {
    if (isLoading) return <LoadingSpinner />;

    switch(activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'realtime':
        return <RealTimeTab />;
      case 'ml-analytics':
        return <MLAnalyticsTab />;
      case 'survival':
        return <SurvivalAnalysisTab />;
      case 'hazard':
        return <HazardModelsTab />;
      case 'rul':
        return <RULPredictionTab />;
      case 'fault-patterns':
        return <FaultPatternsTab />;
      case 'clustering':
        return <ClusteringTab />;
      case 'association':
        return <AssociationRulesTab />;
      case 'reliability':
        return <ReliabilityMetricsTab />;
      case 'recommendations':
        return <RecommendationsTab />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <Settings className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Tab Not Found</h3>
              <p className="text-slate-500">Please select a valid tab from the navigation.</p>
            </div>
          </div>
        );
    }
  }, [activeTab, isLoading]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1920px] mx-auto p-4 lg:p-6 xl:p-8">
          <header className="bg-slate-900 text-white p-6 xl:p-8 rounded-lg mb-8 shadow-lg">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <div>
                <h1 className="text-3xl xl:text-4xl font-bold mb-3 text-white">
                  TfL Advanced Reliability Analytics Dashboard
                </h1>
                <p className="text-slate-300 text-lg xl:text-xl mb-4">AI-Powered Predictive Maintenance & Reliability Engineering</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm bg-blue-600 px-4 py-2 rounded-md font-medium flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    302 Devices
                  </span>
                  <span className="text-sm bg-blue-700 px-4 py-2 rounded-md font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    11 Stations
                  </span>
                  <span className="text-sm bg-blue-800 px-4 py-2 rounded-md font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    XGBoost 98.7% Accuracy
                  </span>
                  <span className="text-sm bg-green-600 px-4 py-2 rounded-md font-medium flex items-center">
                    <Timer className="h-4 w-4 mr-2" />
                    RUL Predictions Active
                  </span>
                </div>
              </div>
              <div className="text-left xl:text-right">
                <div className="flex items-center space-x-3 mb-3">
                  <button
                    onClick={() => setRealTimeMode(!realTimeMode)}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                      realTimeMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${realTimeMode ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></div>
                    <span>{realTimeMode ? 'Live' : 'Static'}</span>
                  </button>
                  <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-slate-300 mb-1">Last Updated: {lastUpdate.toLocaleTimeString()}</p>
                <p className="text-xs text-slate-400">ML Accuracy: 98.7% | Training: 118K records</p>
              </div>
            </div>
          </header>

          <nav className="flex flex-wrap gap-2 mb-8 bg-white p-3 rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
            {ENHANCED_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 xl:px-6 py-3 rounded-md font-medium flex items-center space-x-2 transition-all text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <main role="main">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default TfLDashboard;